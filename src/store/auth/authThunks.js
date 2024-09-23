import { setLogin } from "./authSlice"

const users = [
	{
		id: 1,
		username: "dilan",
		password: "123",
		role: "admin"
	},
	{
		id: 2,
		username: "dilansz",
		password: "123pormi",
		role: "employee"
	},
]

export const startLogin = (username, password) => (dispatch) => {
  const data = users.find( user => user.username === username && user.password === password );
  if (data) {
    dispatch(setLogin(data));
    localStorage.setItem("UserTest", data.id);
  } else {
    console.log("wrong");
  }
}

export const startLoginWithLS = () => (dispatch) => {
  const userLS = Number(localStorage.getItem("UserTest"));
  const data = users.find( user => user.id == userLS );
	if (data) {
    dispatch(setLogin(data));
  } else {
    console.log("wrong");
  }
}