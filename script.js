// Mobile nav toggle
const navToggle = document.getElementById('navToggle');
const nav = document.getElementById('nav');

navToggle.addEventListener('click', () => {
  nav.classList.toggle('open');
});

// Close mobile nav after clicking a link
document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    nav.classList.remove('open');
  });
});

// Scroll-spy: highlight active nav link based on section in view
const sections = document.querySelectorAll('.section');
const navLinks = document.querySelectorAll('.nav-link');

const spy = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.getAttribute('id');
      navLinks.forEach(link => {
        link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
      });
    }
  });
}, { rootMargin: '-40% 0px -55% 0px', threshold: 0 });

sections.forEach(section => spy.observe(section));

// Tool & store logo fallback: if any brand icon fails to load, either swap for a
// text badge (if data-fallback is set) or just hide the broken image gracefully
document.querySelectorAll('.tool-logo, .store-logo, .contact-icon-img').forEach(img => {
  if (img.tagName !== 'IMG') return;
  img.addEventListener('error', () => {
    const fallbackText = img.getAttribute('data-fallback');
    if (fallbackText) {
      const fallback = document.createElement('span');
      fallback.className = img.classList.contains('store-logo') ? 'store-logo tool-fallback' : 'tool-logo tool-fallback';
      fallback.textContent = fallbackText;
      img.replaceWith(fallback);
    } else {
      img.style.display = 'none';
    }
  });
});
