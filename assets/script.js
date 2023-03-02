
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