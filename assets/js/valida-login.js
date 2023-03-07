const validaLogin = async () => {
  let alertNotRepeat = false;
  try {
    const loginUser = document.querySelector("#loginUser");
    const passwordUser = document.querySelector("#passwordUser");

    await fetch("https://seas-bank-task-js.vercel.app/api/db.json", {
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
            window.location.assign("../dashboard/index.html?id=" + element.id);
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

async function setUserName() {
  const urlParams = new URLSearchParams(window.location.search);
  let userId = urlParams.get("id");
  console.log(userId);
  try {
    await fetch("https://seas-bank-task-js.vercel.app/api/db.json", {
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
        json.forEach((element) => {
          if (userId == element.id) {
            document.getElementById("userName").innerHTML = element.nome;
          }
        });
      });
  } catch (error) {
    console.log(error);
  }
}
setUserName();
