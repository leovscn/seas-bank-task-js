function validateFields() {
  let fields = document.querySelectorAll('input[required]');
  let fieldsCompleted = true;
  
  fields.forEach(function(field) {
    if (field.value === "") {
      fieldsCompleted = false;
    }
  });
  
  if (fieldsCompleted) {
    createUser()
  } else {
    alert("Por favor, preencha todos os campos obrigatórios.");
  }
}


async function createUser() {
  let nameUser = document.getElementById('nameUser').value
  let emailUser = document.getElementById('emailUser').value
  let passwordUser = document.getElementById('passwordUser').value

  console.log(nameUser);
  await fetch("http://localhost:3000/usuarios", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      nome: `${nameUser}`,
      email: `${emailUser}`,
      senha: `${passwordUser}`,
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
    })
    
}