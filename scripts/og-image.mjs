/**
 * Brand image generation — invoked by scripts/prerender.mjs at build time.
 *
 * Writes two files into dist/:
 *   og-image.png   1200×630 social share card (og:image / twitter:image).
 *                  A real studio card built from the brand (monogram, name,
 *                  tagline, domain) — never a fake screenshot.
 *   favicon.png    64×64 raster of public/favicon.svg, fallback for consumers
 *                  that do not read SVG favicons (some search/social scrapers).
 *
 * Both are rasterised from SVG with sharp (librsvg). The text stack resolves
 * to DejaVu Sans Mono on the Linux CI runner and Consolas/Courier on Windows.
 */
import { readFile } from 'node:fs/promises'
import path from 'node:path'
import sharp from 'sharp'

/** Output size of og-image.png — mirrored in src/seo.ts (OG metadata). */
export const OG_IMAGE_SIZE = { width: 1200, height: 630 }

// Night-theme brand palette (see tailwind.config.js / public/favicon.svg).
const BG = '#1A1C1E'
const LEMON = '#CCFF00'
const GREEN = '#00FF41'
const TEXT = '#E7EAEC'
const MUTED = '#9BA4AA'
const MONO = "'DejaVu Sans Mono', 'Liberation Mono', Consolas, 'Courier New', monospace"

/** The 1200×630 share card as SVG. */
function ogImageSvg() {
  const { width, height } = OG_IMAGE_SIZE
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
  <rect width="${width}" height="${height}" fill="${BG}" />
  <rect x="28" y="28" width="${width - 56}" height="${height - 56}" fill="none" stroke="${LEMON}" stroke-width="2" />
  <rect x="84" y="84" width="104" height="104" fill="${BG}" stroke="${LEMON}" stroke-width="3" />
  <text x="136" y="151" font-family="${MONO}" font-size="42" font-weight="bold" fill="${GREEN}" text-anchor="middle">MW</text>
  <text x="84" y="330" font-family="${MONO}" font-size="66" font-weight="bold" letter-spacing="2" fill="${TEXT}">MADWOLF STUDIOS</text>
  <rect x="86" y="362" width="180" height="6" fill="${LEMON}" />
  <text x="84" y="428" font-family="${MONO}" font-size="30" fill="${MUTED}">Independent software &amp; game studio</text>
  <text x="84" y="492" font-family="${MONO}" font-size="26" fill="${GREEN}">apps &#183; games &#183; software &#8212; from idea to reality</text>
  <text x="${width - 84}" y="${height - 76}" font-family="${MONO}" font-size="24" letter-spacing="1" fill="${TEXT}" text-anchor="end">madwolfstudios.com</text>
</svg>
`
}

/**
 * Render og-image.png and favicon.png into the given dist directory.
 * Public paths: '/og-image.png' and '/favicon.png' (see src/seo.ts / index.html).
 */
export async function writeBrandImages(distDir, publicDir = path.join(process.cwd(), 'public')) {
  await sharp(Buffer.from(ogImageSvg())).png({ compressionLevel: 9 }).toFile(path.join(distDir, 'og-image.png'))

  const faviconSvg = await readFile(path.join(publicDir, 'favicon.svg'))
  await sharp(faviconSvg).resize(64, 64).png({ compressionLevel: 9 }).toFile(path.join(distDir, 'favicon.png'))
}
