// Alterna menu mobile
function toggleMenu() {
  const menu = document.getElementById("menuMobile");
  menu.style.display = (menu.style.display === "flex") ? "none" : "flex";
}

// Filtrar produtos por categoria usando data-categoria
function filtrarCategoria() {
  const filtro = document.getElementById("filtro-categoria").value;
  const produtos = document.querySelectorAll(".product");

  produtos.forEach(produto => {
    const categoria = produto.getAttribute("data-categoria");
    if (filtro === "todos" || categoria === filtro) {
      produto.style.display = "flex";
    } else {
      produto.style.display = "none";
    }
  });
}

// Resetar filtro
function resetarFiltro() {
  document.getElementById("filtro-categoria").value = "todos";
  filtrarCategoria();
}

// Carrinho em memória
let carrinho = [];

// Adicionar item ao carrinho com sugestão
function adicionarItem(id, nome, preco, sugestaoId) {
  // Adiciona ao carrinho
  carrinho.push({ id, nome, preco });

  // Atualiza total
  atualizarTotal();

  // Mostrar sugestão associada
  const sugestao = document.getElementById(sugestaoId);
  if (sugestao) {
    sugestao.style.display = "block";
    sugestao.innerText = `🍴 O Chef Huseyin recomenda um acompanhamento premium para ${nome}.`;
  }
}

// Atualizar total do carrinho
function atualizarTotal() {
  let total = 0;
  carrinho.forEach(item => {
    total += item.preco;
  });

  const totalElement = document.getElementById("totalCarrinho");
  if (totalElement) {
    totalElement.innerText = `Total: ${formatarPreco(total)} KZ`;
  }
}

// Função utilitária para formatar preço em KZ
function formatarPreco(valor) {
  return valor.toLocaleString("pt-AO", { minimumFractionDigits: 2 });
}

// Remover item do carrinho
function removerItem(id) {
  carrinho = carrinho.filter(item => item.id !== id);
  atualizarTotal();
}
