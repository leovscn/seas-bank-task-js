
const validaLogin = async () =>{
    try {
        const loginUser = document.querySelector("#loginUser")
        const passwordUser = document.querySelector("#passwordUser")

        await fetch("http://localhost:3000/usuarios",{
            method: 'GET',
            headers:{
                "Content-Type": "application/json"
            }
        }).then(res=>{
            if(!res.ok){
                throw new Error(`HTML Status :${res.status}`)
            }
            return res.json()
        }).then(json=>{
            json.forEach(element => {
                console.log(element)
                if(element.numeroDaConta === loginUser.value && element.senha === passwordUser.value){
                    console.log('foi')
                    
                }else{
                    console.log('dados não batem')
                }
            });
        })
    } catch (error) {
        console.log(error)
    }
}

async function postUsers() {
    await fetch("http://localhost:3000/usuarios", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id:4,
        nome: "Usuário da API 2",
        email: "admin2@admin.com",
        senha: "senha123",
        numeroDaConta: "2131415"
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTML Error: ${response.ok}`);
        }
        return response.json();
      })
      .then((users) => {
        console.log("ok");
      });
  }
postUsers()