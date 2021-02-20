import router from "@/router";
import store from "@/store";
import axios from "axios";

export async function createUser(body: any) {
  return axios.post("http://localhost:5000/users", body).then(() => {
    console.log("User created successfully!");
    router.push("/");
  });
}

export async function login(body: any) {
  return axios
    .post("http://localhost:5000/login", body)
    .then(response => {
      localStorage.setItem("jwt", JSON.stringify(response.data.token));
      store.commit("SET_LOGGED_USER", response.data.user);
      localStorage.setItem("user", JSON.stringify(response.data.user));
      router.push("/home");
    })
    .catch(error => {
      if (error.response.data.message) {
        console.log(error.response.data.message);
      } else {
        console.log(error);
      }
    });
}

export async function logout() {
  localStorage.removeItem("user");
  localStorage.removeItem("jwt");
  router.push("/");
}

export function isUserLoggedIn() {
  return localStorage.getItem("user") !== null ? true : false;
}
