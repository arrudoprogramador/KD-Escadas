/* ════════════════════════════════════════════
   DEPÓSITO AMIZADE — Cart Module
   ════════════════════════════════════════════ */

let carrinho = JSON.parse(localStorage.getItem('damizade_cart') || '[]');

/* ── Persistência ── */
function salvarCarrinho() {
  localStorage.setItem('damizade_cart', JSON.stringify(carrinho));
}

/* ── Ações ── */
function adicionarAoCarrinho(id) {
  const prod = produtos.find(p => p.id === id);
  if (!prod || !prod.disponivel) return;

  const existente = carrinho.find(i => i.id === id);
  if (existente) {
    existente.qtd++;
  } else {
    carrinho.push({ ...prod, qtd: 1 });
  }

  salvarCarrinho();
  renderCarrinho();
  openCart();

  // Feedback visual no botão
  const btn = document.querySelector(`[data-add="${id}"]`);
  if (btn) {
    btn.textContent = '✓ Adicionado';
    btn.classList.add('!bg-green-500', '!text-white');
    setTimeout(() => {
      btn.textContent = 'Pedir pelo WA';
      btn.classList.remove('!bg-green-500', '!text-white');
    }, 1500);
  }
}

function removerDoCarrinho(id) {
  carrinho = carrinho.filter(i => i.id !== id);
  salvarCarrinho();
  renderCarrinho();
}

function alterarQtd(id, delta) {
  const item = carrinho.find(i => i.id === id);
  if (!item) return;
  item.qtd += delta;
  if (item.qtd <= 0) removerDoCarrinho(id);
  else { salvarCarrinho(); renderCarrinho(); }
}

function clearCart() {
  carrinho = [];
  salvarCarrinho();
  renderCarrinho();
}

/* ── Drawer ── */
function openCart() {
  document.getElementById('cart-drawer').classList.remove('translate-x-full');
  document.getElementById('cart-overlay').classList.remove('opacity-0', 'pointer-events-none');
  document.getElementById('cart-overlay').classList.add('opacity-100');
  document.body.style.overflow = 'hidden';
}

function closeCart() {
  document.getElementById('cart-drawer').classList.add('translate-x-full');
  document.getElementById('cart-overlay').classList.add('opacity-0', 'pointer-events-none');
  document.getElementById('cart-overlay').classList.remove('opacity-100');
  document.body.style.overflow = '';
}

/* ── Render do carrinho ── */
function renderCarrinho() {
  const list       = document.getElementById('cart-items');
  const empty      = document.getElementById('cart-empty');
  const badge      = document.getElementById('cart-badge');
  const subtotalEl = document.getElementById('cart-subtotal');
  const sendBtn    = document.getElementById('cart-send-btn');

  if (!list) return;

  const qtdTotal = carrinho.reduce((s, i) => s + i.qtd, 0);
  const total    = carrinho.reduce((s, i) => s + i.preco * i.qtd, 0);

  // Badge
  subtotalEl.textContent = `R$ ${total.toFixed(2).replace('.', ',')}`;
  if (qtdTotal > 0) {
    badge.textContent = qtdTotal > 9 ? '9+' : qtdTotal;
    badge.classList.remove('hidden');
    badge.classList.add('flex');
    sendBtn.disabled = false;
    sendBtn.classList.remove('opacity-50', 'cursor-not-allowed');
  } else {
    badge.classList.add('hidden');
    badge.classList.remove('flex');
    sendBtn.disabled = true;
    sendBtn.classList.add('opacity-50', 'cursor-not-allowed');
  }

  // Limpa itens
  list.querySelectorAll('.cart-item').forEach(el => el.remove());

  if (carrinho.length === 0) {
    empty.style.display = '';
    return;
  }

  empty.style.display = 'none';

  carrinho.forEach(item => {
    const div = document.createElement('div');
    div.className = 'cart-item flex items-center gap-3 p-3 rounded-xl border border-white/[0.08] bg-white/[0.03]';
    div.innerHTML = `
      <div class="w-14 h-14 shrink-0 rounded-xl overflow-hidden bg-white/[0.05] flex items-center justify-center">
        ${item.imagem
          ? `<img src="${item.imagem}" alt="${item.nome}" class="w-full h-full object-contain p-2">`
          : `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,.2)" stroke-width="1.5">
              <path d="M20.38 3.46 16 2a4 4 0 0 1-8 0L3.62 3.46a2 2 0 0 0-1.34 2.23l.58 3.57a1 1 0 0 0 .99.84H6v10c0 1.1.9 2 2 2h8a2 2 0 0 0 2-2V10h2.15a1 1 0 0 0 .99-.84l.58-3.57a2 2 0 0 0-1.34-2.23z"/>
             </svg>`
        }
      </div>
      <div class="flex-1 min-w-0">
        <p class="text-white text-sm font-medium truncate">${item.nome}</p>
        <p class="text-[#ffcf58] text-xs font-semibold mt-0.5">
          R$ ${(item.preco * item.qtd).toFixed(2).replace('.', ',')}
        </p>
        <div class="flex items-center gap-2 mt-2">
          <button onclick="alterarQtd(${item.id}, -1)"
            class="w-6 h-6 rounded-full border border-white/10 text-gray-400 hover:border-white/30 hover:text-white transition flex items-center justify-center text-base leading-none">−</button>
          <span class="text-white text-xs font-bold w-4 text-center">${item.qtd}</span>
          <button onclick="alterarQtd(${item.id}, 1)"
            class="w-6 h-6 rounded-full border border-white/10 text-gray-400 hover:border-white/30 hover:text-white transition flex items-center justify-center text-base leading-none">+</button>
        </div>
      </div>
      <button onclick="removerDoCarrinho(${item.id})"
        class="w-7 h-7 rounded-full flex items-center justify-center text-gray-600 hover:text-red-400 hover:bg-red-400/10 transition"
        aria-label="Remover">&times;</button>
    `;
    list.appendChild(div);
  });
}