const getUsers = async () => {
  try {
    const response = await fetch("https://seas-bank-task-js.vercel.app/api/db.json");
    if (!response.ok) {
      throw new Error(`Erro HTTP: ${response.status}`);
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
  const users = await getUsers();
  const user = users.find((user) => user.id === id);
  if (user) {
    return user;
  }

  const localUsers = getLocalUsers();
  return localUsers.find((user) => user.id === id);
};

const validaLogin = () => {
  const loginUser = document.querySelector("#loginUser");
  const passwordUser = document.querySelector("#passwordUser");

  const users = getLocalUsers();
  const user = users.find(
    (user) => user.email === loginUser.value && user.senha === passwordUser.value
  );

  if (user) {
    window.location.assign(`../dashboard/index.html?id=${user.id}`);
  } else {
    alert("Dados incorretos");
  }
};

const setUserName = async () => {
  const urlParams = new URLSearchParams(window.location.search);
  const userId = urlParams.get("id");

  const user = await getUserById(userId);
  if (user) {
    document.getElementById("userName").innerHTML = user.nome;
  }
};

setUserName();