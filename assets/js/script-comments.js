const buscaComentarios = async()=>{
    await fetch('https://my-json-server.typicode.com/leovscn/seas-bank-task-js/comments', {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    }).then(response =>{
      if(!response.ok){
        throw new Error(`HTML response: ${response.status}`)
      }
      return response.json()
    }).then(json => {
      console.log(json)
    }).catch(err=>{
      console.log(err)
    })
  }
  buscaComentarios()
  
  const postaComentario = async ()=>{
    await fetch('https://my-json-server.typicode.com/leovscn/seas-bank-task-js/comments',{
      method: 'POST',
      headers:{
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id:3,
        body: 'third comment',
        postId: 1
      })
    }).then(response =>{
      if(!response.ok){
        throw new Error(`HTML response: ${response.status}`)
      }
      return response.json()
    }).then(data =>{
      console.log(data)
    }).catch(err =>{
      console.log(err)
    })
  }
  postaComentario()
  