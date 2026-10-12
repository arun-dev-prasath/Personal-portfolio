const menuToggle = document.querySelector('.menu-toggle');
const siteNav = document.querySelector('.site-nav');

menuToggle?.addEventListener('click', () => {
  const isOpen = menuToggle.getAttribute('aria-expanded') === 'true';
  menuToggle.setAttribute('aria-expanded', String(!isOpen));
  siteNav.classList.toggle('is-open', !isOpen);
});

document.querySelectorAll('.site-nav a').forEach((link) => {
  link.addEventListener('click', (event) => {
    const targetId = link.getAttribute('href');
    const targetSection = targetId ? document.querySelector(targetId) : null;
    const scrollContainer = document.querySelector('.horizontal-main');

    if (targetSection && scrollContainer) {
      event.preventDefault();
      scrollContainer.scrollTo({
        left: targetSection.offsetLeft,
        behavior: 'smooth'
      });
    }

    menuToggle?.setAttribute('aria-expanded', 'false');
    siteNav.classList.remove('is-open');
  });
});

const horizontalMain = document.querySelector('.horizontal-main');
horizontalMain?.addEventListener('wheel', (event) => {
  if (window.matchMedia('(max-width: 760px)').matches || event.deltaY === 0) return;

  const canScrollVertically = horizontalMain.scrollHeight > horizontalMain.clientHeight;
  if (canScrollVertically) return;

  event.preventDefault();
  horizontalMain.scrollBy({ left: event.deltaY, behavior: 'smooth' });
}, { passive: false });

document.querySelector('#year').textContent = new Date().getFullYear();
