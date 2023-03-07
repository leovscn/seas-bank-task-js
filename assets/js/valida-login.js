const getUsers = async () => {
  try {
    const response = await fetch(
      "https://seas-bank-task-js.vercel.app/api/db.json"
    );
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

const getUserById = async (id) => {
  try {
    const response = await fetch(
      "https://seas-bank-task-js.vercel.app/api/db.json"
    );
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

  const users = getLocalUsers();
  return users.find((user) => user.id === id) || null;
};

async function validaLogin() {
  try {
    const loginUser = document.querySelector("#loginUser");
    const passwordUser = document.querySelector("#passwordUser");

    const apiUsers = await getUsers();
    const localUsers = getLocalUsers();

    const user =
      apiUsers.find(
        (user) =>
          user.email === loginUser.value && user.senha === passwordUser.value
      ) ||
      localUsers.find(
        (user) =>
          user.email === loginUser.value && user.senha === passwordUser.value
      );

    if (user) {
      window.location.assign(`../dashboard/index.html?id=${user.nome}`);
    } else {
      alert("Dados incorretos");
    }
  } catch (error) {
    console.log(error);
  }
}
const setUserName = async (nome) => {
  try {
    const urlParams = new URLSearchParams(window.location.search);
    const userId = urlParams.get("id");

    if (userId) {
      document.getElementById("userName").innerHTML = userId;
    }
  } catch (error) {
    console.log(error);
  }
};

setUserName();
