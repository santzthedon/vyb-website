/* Theme is a device-local preference. Download links work without JavaScript. */
(function () {
  var root = document.documentElement;
  var button = document.getElementById('theme-toggle');
  function apply(mode) {
    root.dataset.theme = mode;
    document.querySelector('meta[name="theme-color"]').content = mode === 'light' ? '#FFF6E8' : '#0D0B14';
    if (button) button.setAttribute('aria-label', mode === 'light' ? 'Switch to dark theme' : 'Switch to light theme');
    document.querySelectorAll('img[data-dark]').forEach(function (img) {
      var next = mode === 'light' ? img.dataset.light : img.dataset.dark;
      if (next && img.getAttribute('src') !== next) img.src = next;
    });
  }
  function saved() { try { return localStorage.getItem('vyb-theme'); } catch (e) { return null; } }
  apply(root.dataset.theme === 'light' ? 'light' : 'dark');
  if (button) button.addEventListener('click', function () {
    var next = root.dataset.theme === 'light' ? 'dark' : 'light';
    apply(next);
    try { localStorage.setItem('vyb-theme', next); } catch (e) {}
  });
  if (window.matchMedia) {
    var preference = matchMedia('(prefers-color-scheme: light)');
    if (preference.addEventListener) preference.addEventListener('change', function (event) {
      if (!saved()) apply(event.matches ? 'light' : 'dark');
    });
  }
})();

/* Preserve the existing production analytics and privacy opt-out.
   Private previews and local copies do not send analytics to production. */
(function () {
  if (location.hostname !== 'www.vybhq.com' && location.hostname !== 'vybhq.com') return;
  var off = navigator.globalPrivacyControl === true;
  try { off = off || localStorage.getItem('vyb-analytics') === 'off'; } catch (e) { off = true; }
  if (off) return;
  var script = document.createElement('script');
  script.async = true;
  script.src = 'https://aromatic-caribou-889.convex.site/api/a/am_lQ6qWeXBk58IrmuK';
  document.head.appendChild(script);
})();
