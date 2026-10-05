(() => {
  const apiBase =
    window.API_BASE_URL ||
    `${window.location.protocol}//${window.location.hostname}:8000/api`;

  window.api = async function api(path, options = {}) {
    const response = await fetch(`${apiBase}${path}`, {
      ...options,
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        ...(options.headers || {}),
      },
    });

    const data = await response.json().catch(() => ({}));

    if (!response.ok) {
      const message =
        data.error ||
        data.message ||
        "Não foi possível concluir a solicitação.";
      const error = new Error(message);
      error.status = response.status;
      throw error;
    }

    return data;
  };
})();
