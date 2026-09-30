document.getElementById("login")?.addEventListener("submit", async (event) => {
  event.preventDefault();

  try {
    await api("/auth/login.php", {
      method: "POST",
      body: JSON.stringify({
        email: email.value,
        password: password.value,
      }),
    });
    location.href = "index.html";
  } catch (error) {
    msg.textContent = error.message;
    msg.className = "alert alert-danger";
  }
});

document
  .getElementById("cadastro")
  ?.addEventListener("submit", async (event) => {
    event.preventDefault();

    try {
      await api("/auth/cadastro.php", {
        method: "POST",
        body: JSON.stringify({
          name: name.value,
          email: email.value,
          password: password.value,
        }),
      });
      location.href = "login.html";
    } catch (error) {
      msg.textContent = error.message;
      msg.className = "alert alert-danger";
    }
  });
