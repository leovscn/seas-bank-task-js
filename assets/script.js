const cep = document.querySelector('#cep');

const showData = (result) => {
  cep.value = result.cep
  for (let campo in result) {
    if (document.querySelector(`#${campo}`)) {
      document.querySelector(`#${campo}`).value = result[campo]
    }
  }
}
async function buscaCep() {
    let cepSemTraco = cep.value.replaceAll('-', '');
    const options = {
      method: 'GET',
      mode: 'cors',
    }

  const viaCep = await fetch(`https://viacep.com.br/ws/${cepSemTraco}/json/`, options);
  const data = await viaCep.json();
  showData(data);
}