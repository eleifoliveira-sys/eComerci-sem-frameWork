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

  function moeda(valor) {
    return Number(valor).toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
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

      elemento.innerHTML = `
        <div class="table-responsive">
          <table class="table align-middle">
            <thead><tr><th>Produto</th><th>Quantidade</th><th>Subtotal</th><th></th></tr></thead>
            <tbody>
              ${carrinho.items
                .map(
                  (item) => `
                    <tr>
                      <td>${escapar(item.name)}</td>
                      <td>${Number(item.quantity)}</td>
                      <td>${moeda(item.subtotal)}</td>
                      <td><button class="btn btn-outline-danger btn-sm" type="button" data-remover="${Number(item.id)}">Remover</button></td>
                    </tr>`,
                )
                .join("")}
            </tbody>
          </table>
        </div>
        <div class="d-flex justify-content-between align-items-center flex-wrap gap-3">
          <h2 class="h4 mb-0">Total: ${moeda(carrinho.total)}</h2>
          <button id="finalizarPedido" class="btn btn-success" type="button">Finalizar pedido</button>
        </div>
        <p id="cartMsg" class="mt-3" role="status"></p>`;

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
