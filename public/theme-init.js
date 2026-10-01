// Apply the saved theme before first paint to avoid a flash of the wrong theme.
// Kept in its own file (not inline) so the site can ship a strict
// Content-Security-Policy without 'unsafe-inline' or script hashes.
(function () {
  try {
    var t = localStorage.getItem('madwolf-theme')
    document.documentElement.setAttribute('data-theme', t === 'light' ? 'light' : 'night')
  } catch (e) {
    document.documentElement.setAttribute('data-theme', 'night')
  }
})()
