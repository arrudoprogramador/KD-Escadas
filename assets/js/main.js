window.addEventListener('scroll', () => {
  document.getElementById('navbar')
    ?.classList.toggle('scrolled', window.scrollY > 40);
}, { passive: true });

/* ── Intersection Observer para animações ── */
function observeReveal() {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll('.reveal:not(.visible)').forEach(el => observer.observe(el));
}

/* ── Boot ── */
document.addEventListener('DOMContentLoaded', () => {
  renderDestaques?.();
  renderFiltros?.();
  renderProdutos?.();
  renderCarrinho?.();
  initSearch?.();
  observeReveal();
});