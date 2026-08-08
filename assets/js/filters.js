/* ════════════════════════════════════════════
   DEPÓSITO AMIZADE — Filters Module
   ════════════════════════════════════════════ */

let catAtual  = 'todos';
let buscaAtual = '';

/* ── Gera pills de categorias dinamicamente ── */
function renderFiltros() {
  const container = document.getElementById('filtros');
  if (!container) return;
  container.innerHTML = '';

  CATEGORIAS.forEach(cat => {
    const btn = document.createElement('button');
    btn.className = `pill${cat.slug === catAtual ? ' active' : ''}`;
    btn.dataset.cat = cat.slug;
    btn.textContent = cat.label;
    container.appendChild(btn);
  });
}

/* ── Delegação de eventos nos pills ── */
document.addEventListener('click', e => {
  const btn = e.target.closest('.pill');
  if (!btn || !btn.dataset.cat) return;

  document.querySelectorAll('.pill').forEach(p => p.classList.remove('active'));
  btn.classList.add('active');
  catAtual = btn.dataset.cat;
  renderProdutos(catAtual, buscaAtual);
});

/* ── Busca ── */
function initSearch() {
  const input = document.getElementById('search-input');
  if (!input) return;

  let debounce;
  input.addEventListener('input', () => {
    clearTimeout(debounce);
    debounce = setTimeout(() => {
      buscaAtual = input.value;
      renderProdutos(catAtual, buscaAtual);
    }, 280);
  });
}

/* ── Reset ── */
function resetFiltros() {
  catAtual   = 'todos';
  buscaAtual = '';
  const input = document.getElementById('search-input');
  if (input) input.value = '';
  renderFiltros();
  renderProdutos();
}