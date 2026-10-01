const API = "http://localhost:8000/api";

async function api(path, options = {}) {
  const response = await fetch(API + path, {
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
    ...options,
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(data.error || "Erro na API");
  }

  return data;
}
