const getUsers = async () => {
  try {
    const response = await fetch("https://seas-bank-task-js.vercel.app/api/db.json");
    if (!response.ok) {
      throw new Error(`HTML Error: ${response.status}`);
    }
    const data = await response.json();
    return data.usuarios;
  } catch (error) {
    console.log(error);
    return [];
  }
};

const getLocalUsers = () => {
  const localData = localStorage.getItem("users");
  return localData ? JSON.parse(localData) : [];
};

async function getUserById(id) {
  try {
    const response = await fetch("https://seas-bank-task-js.vercel.app/api/db.json");
    if (!response.ok) {
      throw new Error(`HTML Error: ${response.status}`);
    }
    const data = await response.json();
    const user = data.usuarios.find((user) => user.id === id);
    if (user) {
      return user;
    }
  } catch (error) {
    console.log(error);
  }

  const users = JSON.parse(localStorage.getItem("users")) || [];
  return users.find((user) => user.id === id);
}
async function validaLogin() {
  let alertNotRepeat = false;
  try {
    const loginUser = document.querySelector("#loginUser");
    const passwordUser = document.querySelector("#passwordUser");

    const users = JSON.parse(localStorage.getItem("users")) || [];
    const user = users.find(
      (user) => user.email === loginUser.value && user.senha === passwordUser.value
    );

    if (user) {
      alertNotRepeat = true;
      window.location.assign(`../dashboard/index.html?id=${user.id}`);
    } else {
      alert("Dados incorretos");
      alertNotRepeat = true;
    }
  } catch (error) {
    console.log(error);
  }
}

async function setUserName() {
  const urlParams = new URLSearchParams(window.location.search);
  const userId = urlParams.get("id");

  const user = await getUserById(userId);
  if (user) {
    document.getElementById("userName").innerHTML = user.nome;
  }
}

setUserName();