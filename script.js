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

// Sugestões IA para cada prato institucional
const sugestoesChef = {
    hamburguer: [
      `🍔 O Chef Huseyin recomenda batatas fritas artesanais para acompanhar o ${nome}.`,
      `🍔 O Chef Huseyin sugere uma bebida gelada para harmonizar com o ${nome}.`,
      `🍔 O Chef Huseyin indica molho barbecue especial para realçar o sabor do ${nome}.`
    ],
    espaguete: [
      `🍝 O Chef Huseyin sugere pão de alho para acompanhar o ${nome}.`,
      `🍝 O Chef Huseyin recomenda uma salada verde leve com o ${nome}.`,
      `🍝 O Chef Huseyin indica finalizar o ${nome} com queijo parmesão ralado.`
    ],
    fahita: [
      `🌯 O Chef Huseyin indica molho picante especial para realçar o sabor da ${nome}.`,
      `🌯 O Chef Huseyin sugere guacamole fresco como acompanhamento da ${nome}.`,
      `🌯 O Chef Huseyin recomenda servir a ${nome} com batatas rústicas e limão.`
    ],
    frango: [
      `🍗 O Chef Huseyin recomenda arroz de manteiga para acompanhar o ${nome}.`,
      `🍗 O Chef Huseyin sugere uma salada tropical junto ao ${nome}.`,
      `🍗 O Chef Huseyin indica molho de iogurte e hortelã para acompanhar o ${nome}.`
    ],
    grelhados: [
      `🥩 O Chef Huseyin sugere uma salada fresca para equilibrar o sabor da ${nome}.`,
      `🥩 O Chef Huseyin recomenda legumes grelhados e batatas assadas com o ${nome}.`,
      `🥩 O Chef Huseyin indica molho chimichurri para realçar o sabor do ${nome}.`
    ],
    Kafta: [
      `🥙 O Chef Huseyin sugere pão sírio e molho de iogurte para acompanhar o ${nome}.`,
      `🥙 O Chef Huseyin recomenda salada tabule junto ao ${nome}.`,
      `🥙 O Chef Huseyin indica hummus fresco para acompanhar o ${nome}.`
    ],
    meze: [
      `🥗 O Chef Huseyin recomenda pão fresco para acompanhar o ${nome}.`,
      `🥗 O Chef Huseyin sugere azeite e azeitonas pretas com o ${nome}.`,
      `🥗 O Chef Huseyin indica torradas e tomate picado para acompanhar o ${nome}.`
    ],
    pizza: [
      `🍕 O Chef Huseyin sugere um vinho tinto leve para harmonizar com a ${nome}.`,
      `🍕 O Chef Huseyin recomenda molho de pimenta suave com a ${nome}.`,
      `🍕 O Chef Huseyin indica uma limonada turca para acompanhar a ${nome}.`
    ],
    frias: [
      `🥤 O Chef Huseyin recomenda servir o ${nome} bem gelado para refrescar a refeição.`,
      `🥤 O Chef Huseyin sugere adicionar rodelas de limão ao ${nome}.`,
      `🥤 O Chef Huseyin indica harmonizar o ${nome} com pratos grelhados.`
    ],
    sobremesas: [
      `🍰 O Chef Huseyin recomenda um café expresso para acompanhar a ${nome}.`,
      `🍰 O Chef Huseyin sugere servir a ${nome} com uma bola de gelado.`,
      `🍰 O Chef Huseyin indica chá turco suave para acompanhar a ${nome}.`
    ],
    bebidas_quentes: [
      `☕ O Chef Huseyin sugere acompanhar o ${nome} com uma sobremesa leve.`,
      `☕ O Chef Huseyin recomenda torradas doces ou bolachas com o ${nome}.`,
      `☕ O Chef Huseyin indica magnólia de morango para acompanhar o ${nome}.`
    ],
    sumos: [
      `🍹 O Chef Huseyin recomenda harmonizar o ${nome} com pratos grelhados.`,
      `🍹 O Chef Huseyin sugere combinar o ${nome} com omeletes e torradas.`,
      `🍹 O Chef Huseyin indica servir o ${nome} com saladas frescas.`
    ],
    matabicho: [
      `🥞 O Chef Huseyin sugere um café ou chá para acompanhar o ${nome}.`,
      `🥞 O Chef Huseyin recomenda sumo natural de laranja com o ${nome}.`,
      `🥞 O Chef Huseyin indica pão fresco e manteiga para acompanhar o ${nome}.`
    ],
    doses: [
      `🍟 O Chef Huseyin recomenda combinar o ${nome} com hambúrgueres ou pizzas.`,
      `🍟 O Chef Huseyin sugere molho de alho ou ketchup artesanal com o ${nome}.`,
      `🍟 O Chef Huseyin indica harmonizar o ${nome} com sumos naturais.`
    ],
    sopas: [
      `🥣 O Chef Huseyin sugere pão torrado para acompanhar a ${nome}.`,
      `🥣 O Chef Huseyin recomenda azeite e salsa fresca com a ${nome}.`,
      `🥣 O Chef Huseyin indica torradas de queijo para acompanhar a ${nome}.`
    ]
  };

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
    sugestao.innerText = sugestoesChef[nome] || 
      `🍴 O Chef Huseyin recomenda um acompanhamento premium para ${nome}.`;
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
