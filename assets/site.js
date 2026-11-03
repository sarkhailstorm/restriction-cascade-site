// Small progressive enhancements. Every page works without this file.

// Close the mobile menu once a link in it is followed (same-page anchors keep the page loaded).
document.querySelectorAll('.menu').forEach((menu) => {
  menu.addEventListener('click', (event) => {
    if (event.target.closest('a')) menu.removeAttribute('open');
  });
});

// Highlight the docs section currently in view in the sidebar.
const tocLinks = [...document.querySelectorAll('.toc a[href^="#"]')];
if (tocLinks.length && 'IntersectionObserver' in window) {
  const byId = new Map(tocLinks.map((link) => [link.getAttribute('href').slice(1), link]));
  const visible = new Set();
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) visible.add(entry.target.id);
      else visible.delete(entry.target.id);
    });
    // The first section in document order that is on screen wins.
    const current = [...byId.keys()].find((id) => visible.has(id));
    if (!current) return;
    tocLinks.forEach((link) => link.classList.toggle('active', link === byId.get(current)));
  }, { rootMargin: '-80px 0px -55% 0px' });
  byId.forEach((_, id) => {
    const section = document.getElementById(id);
    if (section) observer.observe(section);
  });
}
