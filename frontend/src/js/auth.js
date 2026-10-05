(() => {
  const contaLink = document.querySelector("[data-auth-link]");
  const mensagem = document.getElementById("msg");

  function mostrarMensagem(texto, tipo = "erro") {
    if (!mensagem) return;
    mensagem.textContent = texto;
    mensagem.className = `mensagem mensagem-${tipo}`;
    mensagem.setAttribute("role", tipo === "erro" ? "alert" : "status");
  }

  function atualizarCabecalho(logado) {
    if (!contaLink) return;

    const rotulo = contaLink.querySelector(".rotulo");
    if (rotulo) rotulo.textContent = logado ? "Logado" : "Entrar";
    contaLink.href = logado ? "carrinho.html" : "login.html";
    contaLink.setAttribute("aria-label", logado ? "Conta logada" : "Entrar");

    const navegacao = contaLink.closest("nav");
    if (!navegacao) return;

    let sair = navegacao.querySelector("[data-logout]");
    if (logado && !sair) {
      sair = document.createElement("button");
      sair.type = "button";
      sair.className = contaLink.classList.contains("btn")
        ? "btn btn-outline-light btn-sm me-2"
        : "btn-conta";
      sair.dataset.logout = "";
      sair.textContent = "Sair";
      sair.setAttribute("aria-label", "Sair da conta");
      sair.addEventListener("click", async () => {
        sair.disabled = true;
        try {
          await window.api("/autorizacao/sessao", { method: "DELETE" });
          window.location.reload();
        } catch (error) {
          mostrarMensagem(error.message);
          sair.disabled = false;
        }
      });
      contaLink.after(sair);
    } else if (!logado && sair) {
      sair.remove();
    }
  }

  async function verificarSessao() {
    try {
      const sessao = await window.api("/autorizacao/sessao");
      atualizarCabecalho(Boolean(sessao.usuario));
      return Boolean(sessao.usuario);
    } catch {
      atualizarCabecalho(false);
      return false;
    }
  }

  atualizarCabecalho(false);
  verificarSessao();

  const loginForm = document.getElementById("login");
  if (loginForm) {
    const emailInput = loginForm.querySelector("#email");
    const passwordInput = loginForm.querySelector("#password");
    const submitButton = loginForm.querySelector('[type="submit"]');

    emailInput?.addEventListener("invalid", () => {
      mostrarMensagem(
        emailInput.validity.valueMissing
          ? "Informe seu e-mail para entrar."
          : "Digite um endereço de e-mail válido, como nome@dominio.com.",
      );
    });

    loginForm.addEventListener("submit", async (event) => {
      event.preventDefault();
      mostrarMensagem("");
      submitButton.disabled = true;

      try {
        await window.api("/autorizacao/sessao", {
          method: "POST",
          body: JSON.stringify({
            email: emailInput.value.trim(),
            password: passwordInput.value,
          }),
        });
        window.location.href = "index.html";
      } catch (error) {
        mostrarMensagem(
          error.status === 401
            ? "E-mail ou senha incorretos. Confira os dados e tente novamente."
            : error.message,
        );
        submitButton.disabled = false;
      }
    });

    if (new URLSearchParams(window.location.search).has("cadastro")) {
      mostrarMensagem("Conta criada. Entre com seu e-mail e senha.", "sucesso");
    }
  }

  const cadastroForm = document.getElementById("cadastro");
  if (cadastroForm) {
    const emailInput = cadastroForm.querySelector("#email");
    const passwordInput = cadastroForm.querySelector("#password");
    const nomeInput = cadastroForm.querySelector("#name");
    const sobrenomeInput = cadastroForm.querySelector("#sobrenome");
    const submitButton = cadastroForm.querySelector('[type="submit"]');

    emailInput?.addEventListener("invalid", () => {
      mostrarMensagem(
        emailInput.validity.valueMissing
          ? "Informe um e-mail para criar sua conta."
          : "Digite um endereço de e-mail válido, como nome@dominio.com.",
      );
    });

    cadastroForm.addEventListener("submit", async (event) => {
      event.preventDefault();
      mostrarMensagem("");
      submitButton.disabled = true;

      try {
        await window.api("/autorizacao/cad", {
          method: "POST",
          body: JSON.stringify({
            name: [nomeInput.value.trim(), sobrenomeInput?.value.trim()]
              .filter(Boolean)
              .join(" "),
            email: emailInput.value.trim(),
            password: passwordInput.value,
          }),
        });
        window.location.href = "login.html?cadastro=sucesso";
      } catch (error) {
        mostrarMensagem(error.message);
        submitButton.disabled = false;
      }
    });
  }
})();
