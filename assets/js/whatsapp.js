/* ════════════════════════════════════════════
   DEPÓSITO AMIZADE — WhatsApp Module
   ════════════════════════════════════════════ */

function gerarLinkWhatsapp() {
  const lista = carrinho
    .map(i => `• ${i.nome}${i.conteudo ? ` (${i.conteudo})` : ''} — ${i.qtd}x R$ ${(i.preco * i.qtd).toFixed(2).replace('.', ',')}`)
    .join('\n');

  const total = carrinho.reduce((s, i) => s + i.preco * i.qtd, 0);

  const mensagem =
    `Olá! Tenho interesse nos seguintes produtos do Depósito Amizade:\n\n` +
    `${lista}\n\n` +
    `*Total estimado: R$ ${total.toFixed(2).replace('.', ',')}*\n\n` +
    `Aguardo confirmação de disponibilidade e formas de pagamento. Obrigado!`;

  return `https://wa.me/${NUMERO_WA}?text=${encodeURIComponent(mensagem)}`;
}

function sendToWhatsApp() {
  if (carrinho.length === 0) return;
  window.open(gerarLinkWhatsapp(), '_blank');
}

/* ── Link direto (sem carrinho) ── */
function pedirProduto(id) {
  const prod = produtos.find(p => p.id === id);
  if (!prod) return;
  const msg = `Olá! Tenho interesse no produto: *${prod.nome}*${prod.conteudo ? ` (${prod.conteudo})` : ''}. Poderia me informar disponibilidade e prazo? Obrigado!`;
  window.open(`https://wa.me/${NUMERO_WA}?text=${encodeURIComponent(msg)}`, '_blank');
}