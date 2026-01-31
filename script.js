// Alterna menu mobile
function toggleMenu() {
  const menu = document.getElementById("menuMobile");
  menu.style.display = (menu.style.display === "flex") ? "none" : "flex";
}

// Filtrar produtos por categoria (funciona para mobile e desktop)
function filtrarCategoria() {
  // Captura todos os selects de filtro (desktop e mobile)
  const filtros = document.querySelectorAll("#filtro-categoria");
  let filtroSelecionado = "todos";

  filtros.forEach(select => {
    if (select.value !== "todos") {
      filtroSelecionado = select.value;
    }
  });

  const produtos = document.querySelectorAll(".product");

  produtos.forEach(produto => {
    const categoria = produto.getAttribute("data-categoria");
    if (filtroSelecionado === "todos" || categoria === filtroSelecionado) {
      produto.style.display = "flex";
    } else {
      produto.style.display = "none";
    }
  });
}

// Resetar filtro (mobile + desktop)
function resetarFiltro() {
  const filtros = document.querySelectorAll("#filtro-categoria");
  filtros.forEach(select => select.value = "todos");
  filtrarCategoria();
}

// Carrinho em memória
let carrinho = [];

// Sugestões IA para cada prato institucional
const sugestoesChef = {
  "Chef Burger": "🍔 O Chef Huseyin indica molho barbecue especial para realçar o sabor.",
  "Espaguete Bolonhesa": "🍝 Acrescente queijo parmesão ralado na hora.",
  "Pizza Salame": "🍕 Experimente com molho picante premium e uma bebida fria.",
  "Pizza Margherita": "🍕 Combine com azeite extra virgem e folhas de manjericão fresco.",
  "Kafta": "🥙 Sirva com molho de iogurte e hortelã fresca.",
  "Fahita de Frango": "🌮 Acompanhe com guacamole e chips crocantes.",
  "Meze": "🥗 Combine com pão sírio e azeite premium.",
  "Frango Grelhado": "🍗 Sirva com legumes salteados e molho de alho.",
  "Omelete de Carne": "🥚 Combine com pão turco artesanal para realçar o sabor.",
  "Matabicho Completo": "🥐 Acompanhe com café turco ou chá preto.",
  "Sobremesa Baklava": "🍯 Harmonize com chá turco tradicional.",
  "Sobremesa Cheesecake": "🍰 Combine com frutos vermelhos frescos.",
  "Sumo Natural de Manga": "🥭 Refresque com gelo e hortelã.",
  "Sumo Natural de Laranja": "🍊 Ideal para acompanhar pratos leves.",
  "Sopa de Lentilhas": "🥣 Sirva com pão sírio torrado.",
  "Sopa de Frango": "🥣 Acompanhe com arroz branco e limão."
};

// Adicionar item ao carrinho com sugestão
function adicionarItem(id, nome, preco, sugestaoId) {
  carrinho.push({ id, nome, preco });
  atualizarTotal();

  const sugestao = document.getElementById(sugestaoId);
  if (sugestao) {
    sugestao.style.display = "block";
    sugestao.innerText = sugestoesChef[nome] || 
      `🍴 O Chef Huseyin recomenda um acompanhamento premium para ${nome}.`;
  }
}

// Atualizar total do carrinho
function atualizarTotal() {
  let total = 0;
  carrinho.forEach(item => total += item.preco);

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
