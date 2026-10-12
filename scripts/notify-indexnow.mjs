/**
 * IndexNow submitter — runs in CI right after the deployment goes live
 * (see .github/workflows/deploy-pages.yml).
 *
 * Sends every URL listed in dist/sitemap.xml to api.indexnow.org, which
 * notifies Bing (and with it Yahoo), Yandex, Seznam, Naver and the other
 * IndexNow engines about the current state of the site. One call per deploy;
 * the list is small (one sitemap, handful of pages).
 *
 * Requirements (already true for this repo):
 *   - dist/sitemap.xml exists (written by scripts/prerender.mjs)
 *   - dist/indexnow-key.txt is served at https://<host>/indexnow-key.txt
 *     (copied from public/ by Vite — IndexNow verifies the key file there)
 *
 * Exit code 1 on failure; the CI step that calls this is continue-on-error
 * because the site is already published when this runs.
 */
import { readFile } from 'node:fs/promises'
import path from 'node:path'
import process from 'node:process'

const DIST = path.join(process.cwd(), 'dist')

const sitemapXml = await readFile(path.join(DIST, 'sitemap.xml'), 'utf8').catch(() => null)
if (!sitemapXml) {
  console.error('indexnow: dist/sitemap.xml not found — nothing to submit')
  process.exit(1)
}

const urlList = [...sitemapXml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1])
if (urlList.length === 0) {
  console.error('indexnow: sitemap contains no <loc> entries — nothing to submit')
  process.exit(1)
}

const key = (await readFile(path.join(DIST, 'indexnow-key.txt'), 'utf8')).trim()
const host = new URL(urlList[0]).host

const response = await fetch('https://api.indexnow.org/indexNow', {
  method: 'POST',
  headers: { 'content-type': 'application/json; charset=utf-8' },
  body: JSON.stringify({
    host,
    key,
    keyLocation: `https://${host}/indexnow-key.txt`,
    urlList,
  }),
})

// 200 = submitted; 202 = received, key verification pending. Both are success.
if (!response.ok) {
  console.error(`indexnow: submission failed — HTTP ${response.status} ${await response.text()}`)
  process.exit(1)
}

console.log(`indexnow: submitted ${urlList.length} URLs for ${host} (HTTP ${response.status})`)
