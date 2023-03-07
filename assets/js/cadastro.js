const cep = document.querySelector("#cep");
const showData = (result) => {
  for (let campo in result) {
    if (document.querySelector(`#${campo}`)) {
      document.querySelector(`#${campo}`).value = result[campo];
    }
  }
};
async function buscaCep() {
  let cepSemTraco = cep.value.replace(/\D/g, '');
  const options = {
    method: "GET",
    mode: "cors",
  };
  try {
    const viaCep = await fetch(
      `https://viacep.com.br/ws/${cepSemTraco}/json/`,
      options
    );
    if (viaCep.status !== 200) {
      throw new Error(`HTML Error : ${viaCep.status}`);
    }
    const data = await viaCep.json();
    showData(data);
  } catch (error) {
    console.error("Erro ao buscar o CEP:", error);
  }
}


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
    window.location.href = "../login/index.html"
  } else {
    alert("Por favor, preencha todos os campos obrigatórios.");
  }
}


function createUser() {
  let nameUser = document.getElementById('nameUser').value
  let emailUser = document.getElementById('emailUser').value
  let passwordUser = document.getElementById('passwordUser').value

  let users = JSON.parse(localStorage.getItem('users')) || [];

  users.push({
    nome: `${nameUser}`,
    email: `${emailUser}`,
    senha: `${passwordUser}`,
  });

  localStorage.setItem('users', JSON.stringify(users));
}