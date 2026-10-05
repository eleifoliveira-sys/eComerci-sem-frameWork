const API_URL = "http://localhost:8000/api";

async function atualizarIndicadorConta() {
  const indicador = document.getElementById("statusConta");

  if (!indicador) return;

  try {
    const response = await fetch(`${API_URL}/autorizacao/sessao`, {
      method: "GET",
      credentials: "include",
    });

    if (!response.ok) return;

    const sessao = await response.json();

    // O backend retorna { logado: boolean } no GET /autorizacao/sessao.
    if (sessao.logado !== true) return;

    indicador.href = "index.html";
    indicador.classList.add("logado");
    indicador.setAttribute("aria-label", "Usuário logado");
    indicador.title = "Usuário logado";
    indicador.innerHTML = `
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <circle cx="12" cy="12" r="9" />
        <path d="m8 12 2.5 2.5L16 9" />
      </svg>
      <span class="rotulo">Logado</span>
    `;
  } catch (error) {
    console.error("Não foi possível verificar a sessão:", error);
  }
}

atualizarIndicadorConta();
