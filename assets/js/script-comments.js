const buscaComentarios = async () => {
  await fetch("https://jsonplaceholder.typicode.com/comments", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTML response: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      for (let i = 0; i < 4; i++) {
        let comentario = document.createElement("div");
        comentario.classList.add("card");
        comentario.innerHTML = `
            <h3>${data[i].name} - ${data[i].email}</h3>
    
            <p>${data[i].body}</p>
            `;
        document.getElementById("comments").appendChild(comentario);
      }
    })
    .catch((err) => {
      console.log(err);
    });
};
buscaComentarios();

const postaComentario = async () => {
  const email = document.getElementById("email").value;
  const msg = document.getElementById("msg").value;
  const nome = document.getElementById("nome").value;
  await fetch("https://jsonplaceholder.typicode.com/comments", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      postId: 1,
      id: 1,
      name: `${nome}`,
      email: `${email}`,
      body: `${msg}`,
    }),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTML response: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      let comentario = document.createElement("div");
      comentario.classList.add("card");
      comentario.innerHTML = `
        <h3>${data.name} - ${data.email}</h3>

        <p>${data.body}</p>
        `;
      document.getElementById("comments").appendChild(comentario);
      console.log(data);
    })
    .catch((err) => {
      console.log(err);
    });
};
//   postaComentario()
