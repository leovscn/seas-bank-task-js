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
const pegaCotacoes = async()=>{

    await fetch(`https://economia.awesomeapi.com.br/last/USD-BRL,EUR-BRL,GBP-BRL,ARS-BRL`, 
    {
        method: 'GET',
        headers: {
            "Content-Type": 'application/json'
        }
    }).then((response)=>{
        if(!response.ok){
            throw new Error(`HTML Error : ${response.status}`)
        }
        return response.json()
    }).then((cotacoes)=>{
        let lista = Object.entries(cotacoes)
        lista.forEach(element => {
            const itemCotacao = document.createElement('div')
            itemCotacao.classList.add("card")
            itemCotacao.innerHTML = `<li> 1 ${element.valueOf()[1]['code']} custa ${Number(element.valueOf()[1]['bid']).toFixed(2)} ${element.valueOf()[1]['codein']}</li>`
            document.querySelector('#cotacoes').appendChild(itemCotacao)
        });
        let avisoValidade = document.createElement('p')
        const data = new Date(lista[0][1]['create_date'])
        avisoValidade.innerHTML= `* Preços válidos para ${data.getUTCDate()}/${data.getMonth()+1}/${data.getFullYear()}`
        document.querySelector('.cards').appendChild(avisoValidade)
    }).catch(err=>{
        cotacoes.innerHTML = err
    })
}
pegaCotacoes()