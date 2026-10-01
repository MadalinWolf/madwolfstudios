/**
 * Local preview that mimics how Netlify serves `dist/` in production.
 *
 * `vite preview` falls back to index.html for unknown paths (SPA mode), which
 * would hide soft-404s. This server replicates the real Netlify rules instead:
 *
 *   - exact file                        → 200
 *   - /dir (no slash, dir/index.html)   → 301 → /dir/      (Pretty URLs default)
 *   - /dir/                             → 200 dir/index.html
 *   - anything else                     → 404.html with HTTP 404
 *   - same security/cache headers as netlify.toml (keep in sync manually)
 *
 * Usage: npm run build && npm run preview:netlify   → http://localhost:4180
 */
import { createReadStream } from 'node:fs'
import { stat } from 'node:fs/promises'
import http from 'node:http'
import path from 'node:path'
import process from 'node:process'

const DIST = path.resolve(process.cwd(), 'dist')
const PORT = Number(process.env.PORT || 4180)

// Keep in sync with netlify.toml.
const SECURITY_HEADERS = {
  'X-Content-Type-Options': 'nosniff',
  'X-Frame-Options': 'DENY',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'Strict-Transport-Security': 'max-age=31536000; includeSubDomains',
  'Permissions-Policy': 'camera=(), microphone=(), geolocation=()',
  'Content-Security-Policy':
    "default-src 'self'; base-uri 'self'; object-src 'none'; script-src 'self'; style-src 'self'; img-src 'self' data:; font-src 'self'; connect-src 'self'; frame-ancestors 'none'; frame-src 'self' https://www.youtube.com https://www.youtube-nocookie.com https://player.vimeo.com; form-action 'self'",
}

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.mjs': 'text/javascript; charset=utf-8',
  '.json': 'application/json',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.webp': 'image/webp',
  '.ico': 'image/x-icon',
  '.woff2': 'font/woff2',
  '.txt': 'text/plain; charset=utf-8',
  '.xml': 'application/xml; charset=utf-8',
  '.map': 'application/json',
}

async function fileInfo(target) {
  try {
    const info = await stat(target)
    if (info.isFile()) return { type: 'file', info }
    if (info.isDirectory()) return { type: 'dir' }
  } catch {
    /* missing */
  }
  return null
}

function send(res, status, filePath, extraHeaders = {}) {
  const ext = path.extname(filePath).toLowerCase()
  const headers = {
    'Content-Type': MIME[ext] || 'application/octet-stream',
    ...SECURITY_HEADERS,
    ...extraHeaders,
  }
  if (filePath.startsWith(path.join(DIST, 'assets'))) {
    headers['Cache-Control'] = 'public, max-age=31536000, immutable'
  }
  res.writeHead(status, headers)
  createReadStream(filePath).pipe(res)
}

function redirect(res, location) {
  res.writeHead(301, { Location: location, ...SECURITY_HEADERS })
  res.end()
}

const server = http.createServer(async (req, res) => {
  try {
    const pathname = decodeURIComponent(new URL(req.url, 'http://localhost').pathname)
    // Refuse anything that escapes dist/ (path traversal).
    const target = path.resolve(DIST, '.' + path.posix.normalize(pathname))
    if (!target.startsWith(DIST)) {
      res.writeHead(403, SECURITY_HEADERS)
      return res.end('Forbidden')
    }

    const found = await fileInfo(target)

    if (found?.type === 'file') {
      return send(res, 200, target)
    }

    if (found?.type === 'dir') {
      const indexFile = path.join(target, 'index.html')
      if ((await fileInfo(indexFile))?.type === 'file') {
        // Netlify Pretty URLs: /dir → 301 → /dir/
        if (!pathname.endsWith('/')) return redirect(res, pathname + '/')
        return send(res, 200, indexFile)
      }
    }

    // No match → real 404 with the prerendered 404 page.
    const notFoundPage = path.join(DIST, '404.html')
    if ((await fileInfo(notFoundPage))?.type === 'file') {
      return send(res, 404, notFoundPage, { 'Cache-Control': 'no-store' })
    }
    res.writeHead(404, SECURITY_HEADERS)
    res.end('404 — dist/404.html missing (run `npm run build`)')
  } catch (err) {
    res.writeHead(500, SECURITY_HEADERS)
    res.end(String(err))
  }
})

server.listen(PORT, () => {
  console.log(`Netlify-like preview: http://localhost:${PORT}`)
  console.log(`Serving ${DIST}`)
})
