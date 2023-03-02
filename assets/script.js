const cep = document.querySelector('#cep');

const showData = (result) => {
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
  try {
    const viaCep = await fetch(`https://viacep.com.br/ws/${cepSemTraco}/json/`, options);
    if(viaCep.status !== 200) {
      console.error('Erro ao conectar com a API');
    }
    const data = await viaCep.json();
    showData(data);
  } catch (error) {
    console.error('Erro ao buscar o CEP:', error)
  }
}