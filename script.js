// Função para alternar o menu mobile
function toggleMenu() {
  const menu = document.getElementById("menuMobile");
  if (menu.style.display === "flex") {
    menu.style.display = "none";
  } else {
    menu.style.display = "flex";
  }
}

// Exemplo de função de filtro (mantida)
function filtrarCategoria() {
  const filtro = document.getElementById("filtro-categoria").value;
  const produtos = document.querySelectorAll(".product");

  produtos.forEach(produto => {
    if (filtro === "todos" || produto.classList.contains(filtro)) {
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

// Botão adicionar ao carrinho com feedback visual
document.querySelectorAll(".btn-add").forEach(btn => {
  btn.addEventListener("click", () => {
    btn.classList.add("clicked");
    setTimeout(() => btn.classList.remove("clicked"), 600);
  });
});
