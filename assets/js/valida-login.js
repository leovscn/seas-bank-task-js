const validaLogin = async () => {
  try {
    const loginUser = document.querySelector("#loginUser");
    const passwordUser = document.querySelector("#passwordUser");

    await fetch("http://localhost:3000/usuarios", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTML Status :${res.status}`);
        }
        return res.json();
      })
      .then((json) => {
        json.forEach((element) => {
          console.log(element);
          if (
            element.email === loginUser.value &&
            element.senha === passwordUser.value
          ) {
            window.location.assign("../dashboard/index.html"); 
          } else {
            console.log("Dados incorretos");
          }
        });
      })
      .then(
        (user) => (document.getElementById("userName").innerHTML = user.nome)
      );
  } catch (error) {
    console.log(error);
  }
};

// async function postUsers() {
//   await fetch("http://localhost:3000/usuarios", {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({
//       nome: "Usuário da API 2",
//       email: "admin2@admin.com",
//       senha: "senha123",
//       numeroDaConta: "2131435",
//     }),
//   })
//     .then((response) => {
//       if (!response.ok) {
//         throw new Error(`HTML Error: ${response.status}`);
//       }
//       return response.json();
//     })
//     .then((users) => {
//       console.log("ok");
//     });
// }