const regexEmail = /\S+@\S+\.\S+/gi
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
            <div class="comment-header">
            <i class="fa-solid fa-user"></i>
            <h3>${data[i].name} - ${data[i].email}</h3>
            </div>

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
  try {
    
    const email = document.getElementById("email").value;
    const msg = document.getElementById("msg").value;
    const nome = document.getElementById("nome").value;
    if(!regexEmail.test(email)){
      throw new Error('Email inválido')
    }else if(msg.trim()==""||nome.trim()==""){
      throw new Error('A mensagem e o nome não podem estar vazios.')
    }
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
      <div class="comment-header">
      <i class="fa-solid fa-user"></i>
        <h3>${data.name} - ${data.email}</h3>
        </div>
        <p>${data.body}</p>
        `;
      document.getElementById("comments").appendChild(comentario);
      console.log(data);
    })
  } catch (error) {
    console.log(error);
  }
};


const submitNews = document.getElementById("submitNews");

submitNews.addEventListener("click", (event) => {
event.preventDefault();

const nameInput = document.getElementById("nameNews");
const emailInput = document.getElementById("emailNews");
const numberInput = document.getElementById("numberNews");

const emailRegex = /^[^\s@]+@[^\s@]+.[^\s@]+$/;
const numberRegex = /^\d{10}$/;

if (!nameInput.value) {
alert("Por favor, preencha o campo de nome.");
return;
}
if (!emailInput.value) {
alert("Por favor, preencha o campo de e-mail.");
return;
}
if (!emailRegex.test(emailInput.value)) {
alert("Por favor, insira um e-mail válido.");
return;
}
if (!numberInput.value) {
alert("Por favor, preencha o campo de telefone.");
return;
}
if (!numberRegex.test(numberInput.value)) {
alert("Por favor, insira um número de telefone válido com 10 dígitos.");
return;
}

alert('Email cadastrado com sucesso!');
nameInput.value = "";
emailInput.value = "";
numberInput.value = "";
});