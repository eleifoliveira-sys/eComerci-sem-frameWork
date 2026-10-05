(() => {
  const elemento = document.getElementById("cart");
  if (!elemento) return;

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

    if (!cart || !Array.isArray(cart.items)) {
      throw new Error("Faça login para ver o seu carrinho");
    }

    if (!cart.items.length) {
      element.innerHTML = "<p>Seu carrinho está vazio.</p>";
      return;
    }

  async function carregarCarrinho() {
    elemento.innerHTML = "<p>Carregando carrinho...</p>";
    try {
      const carrinho = await window.api("/carrinho");
      if (!carrinho.items?.length) {
        elemento.innerHTML =
          '<p>Seu carrinho está vazio. <a href="index.html">Continuar comprando</a></p>';
        return;
      }

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

      elemento.querySelectorAll("[data-remover]").forEach((botao) => {
        botao.addEventListener("click", async () => {
          botao.disabled = true;
          try {
            await window.api(
              `/carrinho?id=${encodeURIComponent(botao.dataset.remover)}`,
              {
                method: "DELETE",
              },
            );
            await carregarCarrinho();
          } catch (error) {
            const mensagem = document.getElementById("cartMsg");
            mensagem.textContent = error.message;
            mensagem.className = "text-danger mt-3";
            botao.disabled = false;
          }
        });
      });

      document
        .getElementById("finalizarPedido")
        .addEventListener("click", async (event) => {
          const botao = event.currentTarget;
          const mensagem = document.getElementById("cartMsg");
          botao.disabled = true;
          try {
            const pedido = await window.api("/pedidos", { method: "POST" });
            elemento.innerHTML = `
            <div class="alert alert-success" role="status">
              Pedido #${Number(pedido.order_id)} criado com sucesso.
              <a href="index.html" class="alert-link">Continuar comprando</a>
            </div>`;
          } catch (error) {
            mensagem.textContent = error.message;
            mensagem.className = "text-danger mt-3";
            botao.disabled = false;
          }
        });
    } catch (error) {
      const exigirLogin = error.status === 401;
      elemento.innerHTML = `
        <div class="alert alert-warning" role="alert">
          ${escapar(exigirLogin ? "Entre na sua conta para acessar o carrinho." : error.message)}
          ${exigirLogin ? '<a href="login.html">Entrar</a>' : ""}
        </div>`;
    }
  }

  carregarCarrinho();
})();
