const validaLogin = async () => {
  let alertNotRepeat = false;
  try {
    const loginUser = document.querySelector("#loginUser");
    const passwordUser = document.querySelector("#passwordUser");

    await fetch("http://localhost:3000/usuarios", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTML Status :${res.status}`);
        }
        return res.json();
      })
      .then((json) => {
        let userFound = false;
        json.forEach((element) => {
          if (
            element.email === loginUser.value &&
            element.senha === passwordUser.value
          ) {
            userFound = true;
            alertNotRepeat = true;
            window.location.assign("../dashboard/index.html"); 
          }
        });
        if (!userFound && !alertNotRepeat) {
          alert("Dados incorretos");
          alertNotRepeat = true;
        }
      });
  } catch (error) {
    console.log(error);
  }
};
