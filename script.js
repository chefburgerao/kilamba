let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];

// Salvar carrinho
function salvarCarrinho() {
  localStorage.setItem("carrinho", JSON.stringify(carrinho));
  renderCarrinho();
}

// Renderizar carrinho
function renderCarrinho() {
  const cartItems = document.getElementById("cart-items");
  const cartTotal = document.getElementById("cart-total");
  if (!cartItems || !cartTotal) return;

  cartItems.innerHTML = "";
  let total = 0;

  carrinho.forEach((item, index) => {
    total += item.preco * item.qtd;

    const div = document.createElement("div");
    div.classList.add("cart-item");
    div.innerHTML = `
      <span>${item.nome}</span>
      <div>
        <button onclick="alterarQtd(${index}, -1)">-</button>
        <span>${item.qtd}</span>
        <button onclick="alterarQtd(${index}, 1)">+</button>
        <button onclick="removerItem(${index})">✖</button>
      </div>
      <span>${(item.preco * item.qtd).toLocaleString("pt-AO")} KZ</span>
    `;
    cartItems.appendChild(div);
  });

  cartTotal.innerHTML = `<strong>Total: ${total.toLocaleString("pt-AO")} KZ</strong>`;
}

// Alterar quantidade
function alterarQtd(index, delta) {
  carrinho[index].qtd += delta;
  if (carrinho[index].qtd <= 0) carrinho.splice(index, 1);
  salvarCarrinho();
}

// Remover item
function removerItem(index) {
  carrinho.splice(index, 1);
  salvarCarrinho();
}

// Função de sugestões locais por categoria (mínimo 3 opções aleatórias)
function gerarTextoSugestao(nome, categoria) {
  const sugestoes = {
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

  const lista = sugestoes[categoria];
  if (!lista) return `✨ O Chef Huseyin recomenda uma sobremesa premium para completar a sua refeição.`;

  const aleatoria = lista[Math.floor(Math.random() * lista.length)];
  return aleatoria;
}

// Sugestão imediata no index
function gerarSugestaoIndex(nome, categoria, sugId) {
  const sugDiv = document.getElementById(sugId);
  if (!sugDiv) return;

  sugDiv.textContent = gerarTextoSugestao(nome, categoria);
  sugDiv.style.display = "block";

  setTimeout(() => {
    sugDiv.textContent = "";
    sugDiv.style.display = "none";
  }, 3000);
}

// Sugestões permanentes no encomendas.html
function gerarSugestoes(carrinho) {
  const sugestoesDiv = document.getElementById("sugestoes-lista");
  if (!sugestoesDiv) return;

  sugestoesDiv.innerHTML = "";

  carrinho.forEach(item => {
    const sugestao = document.createElement("div");
    sugestao.classList.add("sugestao");
    sugestao.textContent = gerarTextoSugestao(item.nome, item.categoria);
    sugestoesDiv.appendChild(sugestao);
  });
}

// Adicionar item
function adicionarItem(id, nome, preco, sugId) {
  const produto = document.querySelector(`button[onclick*="${id}"]`).closest(".product");
  const categoria = produto.getAttribute("data-categoria");

  const item = carrinho.find(i => i.id === id);
  if (item) {
    item.qtd++;
  } else {
    carrinho.push({ id, nome, preco, qtd: 1, categoria });
  }
  salvarCarrinho();

  // Sugestão IA local
  gerarSugestaoIndex(nome, categoria, sugId);

  // efeito visual no botão
  const btn = event.target;
  btn.classList.add("clicked");
  btn.innerText = "Adicionado ✅";

    setTimeout(() => {
    btn.innerText = "Adicionar";
    btn.classList.remove("clicked");
  }, 2000);
}

// Filtro de categorias
function filtrarCategoria() {
  const filtro = document.getElementById("filtro-categoria").value;
  const produtos = document.querySelectorAll(".product");

  produtos.forEach(produto => {
    if (filtro === "todos" || produto.dataset.categoria === filtro) {
      produto.style.display = "flex";
    } else {
      produto.style.display = "none";
    }
  });
}

// Resetar filtro
function resetarFiltro() {
  const filtro = document.getElementById("filtro-categoria");
  if (filtro) {
    filtro.value = "todos";
    filtrarCategoria();
  }
}

// Mobile: abrir/fechar carrinho
document.addEventListener("DOMContentLoaded", () => {
  const btnCarrinho = document.getElementById("btnCarrinho");
  const carrinhoDiv = document.getElementById("carrinho");
  const fecharCarrinho = document.getElementById("fecharCarrinho");

  if (btnCarrinho) {
    btnCarrinho.addEventListener("click", () => {
      carrinhoDiv.classList.add("active");
    });
  }
  if (fecharCarrinho) {
    fecharCarrinho.addEventListener("click", () => {
      carrinhoDiv.classList.remove("active");
    });
  }

  renderCarrinho();
});
