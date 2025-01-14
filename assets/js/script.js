// COTAÇÕES

async function pegarCotacoes(select) {
  document.querySelector("#cotacoes").innerHTML = "";
  await fetch(`https://economia.awesomeapi.com.br/last/${select}-BRL`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTML Error : ${response.status}`);
      }
      return response.json();
    })
    .then((cotacoes) => {
      let lista = Object.entries(cotacoes);
      lista.forEach((element) => {
        const itemCotacao = document.createElement("div");
        itemCotacao.classList.add("card");
        itemCotacao.innerHTML = `<li> 1 ${
          element.valueOf()[1]["code"]
        } = ${Number(element.valueOf()[1]["bid"]).toFixed(2)} ${
          element.valueOf()[1]["codein"]
        }</li>`;
        document.querySelector("#cotacoes").appendChild(itemCotacao);
      });

      let avisoValidade = document.createElement("p");
      const data = new Date(lista[0][1]["create_date"]);
      avisoValidade.innerHTML = `* Preços válidos para ${data.getUTCDate()}/${
        data.getMonth() + 1
      }/${data.getFullYear()}`;
      document.querySelector(".card").appendChild(avisoValidade);
    })
    .catch((err) => {
      cotacoes.innerHTML = err;
    });
}
pegarCotacoes("USD");

async function listarUsuarios() {
  await fetch("https://jsonplaceholder.typicode.com/users", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTML Error : ${response.status}`);
      }
      return response.json();
    })
    .then((users) => {
      users.forEach((user) => {
        document.getElementById(
          "users"
        ).innerHTML += `<div class="card">  <p> <b style="color: black">Nome:</b> 
        ${user.name},<br> <b style="color: black">Cidade:</b> 
        ${user.address.city} <br><b style="color: black">Email:</b> 
        ${user.email} </p></div>`;
      });
    });
}
listarUsuarios();
