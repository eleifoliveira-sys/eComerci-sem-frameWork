async function carregarCarrinho() {
  const element = document.getElementById("cart");

  try {
    const cart = await api("/carrinho");

    if (!cart || !Array.isArray(cart.items)) {
      throw new Error("Faça login para ver o seu carrinho");
    }

    if (!cart.items.length) {
      element.innerHTML = "<p>Seu carrinho está vazio.</p>";
      return;
    }

    const itemsHtml = cart.items
      .map(
        (item) => `
				<div class="border rounded p-3 mb-2 d-flex justify-content-between">
					<span>${item.name} x ${item.quantity}</span>
					<strong>R$ ${Number(item.subtotal).toFixed(2).replace(".", ",")}</strong>
				</div>
			`,
      )
      .join("");

    element.innerHTML = `${itemsHtml}
			<h3 class="mt-4">
				Total: R$ ${Number(cart.total).toFixed(2).replace(".", ",")}
			</h3>
			<button class="btn btn-success" onclick="criarPedido()">
				Finalizar pedido
			</button>
		`;
  } catch (error) {
    const mensagem =
      error instanceof TypeError
        ? "Não foi possível carregar o carrinho"
        : error.message;

    element.innerHTML = `
			<div class="alert alert-warning">
				${mensagem}. <a href="login.html">Entrar</a>
			</div>
		`;
  }
}

async function criarPedido() {
  try {
    const result = await api("/pedidos/criar.php", { method: "POST" });
    alert(`Pedido #${result.order_id} criado!`);
    carregarCarrinho();
  } catch (error) {
    alert(error.message);
  }
}