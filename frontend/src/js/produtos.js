async function carregar() {
  const query = document.getElementById("busca")?.value || "";

  try {
    const products = await api(
      "/produtos/listar.php?q=" + encodeURIComponent(query),
    );
    const productsElement = document.getElementById("produtos");

    productsElement.innerHTML =
      products
        .map(
          (product) => `
			<div class="col-12 col-sm-6 col-lg-4">
				<div class="card h-100 shadow-sm">
					<div class="card-body">
						<span class="badge text-bg-secondary">${product.category}</span>
						<h5 class="mt-2">${product.name}</h5>
						<p>${product.description || ""}</p>
						<strong>R$ ${Number(product.price).toFixed(2).replace(".", ",")}</strong>
						<p class="small mt-2">
							${product.stock > 0 ? "Em estoque" : "Sem estoque"}
						</p>
						<a href="produto.html?id=${product.id}" class="btn btn-dark w-100">
							Ver produto
						</a>
					</div>
				</div>
			</div>
		`,
        )
        .join("") || "<p>Nenhum produto encontrado.</p>";
  } catch (error) {
    console.error(error);
  }
}


const botao = document.getElementById("search");

const sbar = document.getElementById("busca");

if (window.innerWidth <= 768) {
	sbar.classList.toggle("btnbar0");


  botao.addEventListener("click", function (event) {
    botao.classList.toggle("btnsearch0");
    sbar.classList.toggle("btnbar0");
  });
}
	else if(window.innerWidth > 768) {
		sbar.classList.toggle("btnbar01");
	}

