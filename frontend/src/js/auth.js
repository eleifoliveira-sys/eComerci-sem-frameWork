document.getElementById("login").addEventListener("submit", async (event) => {
  event.preventDefault();

  try {
    await api("/autorizacao/sessao", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
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

const formCadastro = document.getElementById("cadastro");

if(formCadastro){
  formCadastro.addEventListener("submit", async (event) => {
    event.preventDefault();
    const name = formCadastro.querySelector("#name");
    const email = formCadastro.querySelector("#email");
    const password = formCadastro.querySelector("#password");

    try {
      await api("/autorizacao/cad", {
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
}