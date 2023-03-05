let userName = document.getElementById('nameUser').value
let emailUser = document.getElementById('emailUser').value
let passwordUser = document.getElementById('passwordUser').value

async function postUsers() {
  await fetch("http://localhost:3000/usuarios", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      nome: "Usuário da API 2",
      email: "admin2@admin.com",
      senha: "senha123",
      numeroDaConta: "2131435",
    }),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTML Error: ${response.status}`);
      }
      return response.json();
    })
    .then((users) => {
      console.log("ok");
    });
}