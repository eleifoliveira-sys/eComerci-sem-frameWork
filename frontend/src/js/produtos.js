(() => {
  const grid = document.getElementById("produtos");
  const detalhe = document.getElementById("produto");

  function escapar(valor = "") {
    return String(valor).replace(
      /[&<>"']/g,
      (caractere) =>
        ({
          "&": "&amp;",
          "<": "&lt;",
          ">": "&gt;",
          '"': "&quot;",
          "'": "&#39;",
        })[caractere],
    );
  }

  function moeda(valor) {
    return Number(valor).toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  }

  function normalizarLista(resposta) {
    if (Array.isArray(resposta)) return resposta;
    if (Array.isArray(resposta?.data)) return resposta.data;
    return [];
  }

  function imagemDoProduto(produto) {
    if (produto.image) {
      const imagem = String(produto.image).trim();
      if (imagem.startsWith("data:")) {
        return imagem;
      }
      const caminhoBackend = imagem.match(
        /(?:uploads\/produtos|produtos)\/([^?#]+)/i,
      );
      if (caminhoBackend) {
        return `/images/${caminhoBackend[1]
          .split("/")
          .map(encodeURIComponent)
          .join("/")}`;
      }
      if (/^(https?:)?\/\//i.test(imagem)) return imagem;
      if (imagem.startsWith("/images/")) return imagem;

      const caminho = imagem.replace(/^\/+/, "");
      const arquivo = caminho
        .replace(/^backend\//i, "")
        .replace(/^uploads\/produtos\//i, "")
        .replace(/^produtos\//i, "");
      return `/images/${encodeURIComponent(arquivo)}`;
    }
    return /mouse/i.test(produto.name) ? "/images/estoque/image.png" : "";
  }

  async function carregarCategorias() {
    const menu = document.getElementById("menuCategorias");
    if (!menu) return;

    try {
      const categorias = await window.api("/categorias");
      const categoriasLista = normalizarLista(categorias);

      menu.innerHTML = [
        '<a href="#produtos" data-category-id="">Todas as categorias</a>',
        ...categoriasLista.map(
          (categoria) =>
            `<a href="#produtos" data-category-id="${Number(categoria.id)}">${escapar(categoria.name)}</a>`,
        ),
      ].join("");
      menu.addEventListener("click", (event) => {
        const link = event.target.closest("[data-category-id]");
        if (!link) return;
        event.preventDefault();
        menu
          .querySelectorAll("a")
          .forEach((item) => item.classList.remove("ativo"));
        link.classList.add("ativo");
        carregarProdutos();
      });
    } catch (error) {
      console.error("Não foi possível carregar as categorias:", error);
    }
  }

  async function carregarProdutos() {
    if (!grid) return;

    const busca = document.getElementById("busca")?.value.trim() || "";
    const categoriaId = document.querySelector(
      "#menuCategorias [data-category-id].ativo",
    )?.dataset.categoryId;
    const parametros = new URLSearchParams();
    if (busca) parametros.set("q", busca);
    if (categoriaId) parametros.set("category_id", categoriaId);

    grid.innerHTML = '<p class="text-muted">Carregando produtos...</p>';
    try {
      const produtos = await window.api(
        `/produtos${parametros.size ? `?${parametros}` : ""}`,
      );
      const produtosLista = normalizarLista(produtos);

      grid.innerHTML = produtosLista.length
        ? produtosLista
            .map(
              (produto) => `
                <article class="col-12 col-sm-6 col-lg-4">
                  <div class="card h-100 shadow-sm">
                      ${imagemDoProduto(produto) ? `<img class="card-img-top produto-imagem" src="${escapar(imagemDoProduto(produto))}" alt="${escapar(produto.name)}" loading="lazy">` : ""}
                    <div class="card-body d-flex flex-column">
                      <span class="badge text-bg-secondary align-self-start">${escapar(produto.category)}</span>
                      <h2 class="h5 mt-3">${escapar(produto.name)}</h2>
                      <p class="text-muted">${escapar(produto.description || "")}</p>
                      <strong class="mt-auto">${moeda(produto.price)}</strong>
                      <p class="small mt-2 mb-3">${Number(produto.stock) > 0 ? "Em estoque" : "Sem estoque"}</p>
                      <a href="produto.html?id=${encodeURIComponent(produto.id)}" class="btn btn-dark">Ver produto</a>
                    </div>
                  </div>
                </article>`,
            )
            .join("")
        : '<p class="text-muted">Nenhum produto encontrado.</p>';
    } catch (error) {
      grid.innerHTML = `<p class="alert alert-danger" role="alert">${escapar(error.message)}</p>`;
    }
  }
}


const botao = document.getElementById("search");

const sbar = document.getElementById("busca");

if (window.innerWidth <= 768) {
	sbar.classList.toggle("btnbar0");


  botao.addEventListener("click", function (event) {
	botao.classList.remove("btnsearch1");
    botao.classList.toggle("btnsearch0");
    sbar.classList.toggle("btnbar0");
  });
}
	else if(window.innerWidth > 768) {
		sbar.classList.toggle("btnbar1");
		botao.classList.toggle("btnsearch0");
	}

