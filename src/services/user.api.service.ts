import IUser from "@/interfaces/IUser";
import router from "@/router";
import store from "@/store";
import axios from "axios";
import { googleAuth } from "./passport";

export async function createUser(body: any) {
  return axios
    .post("http://localhost:5000/api/users", body)
    .then(() => {
      console.log("User created successfully!");
      router.push("/login");
    })
    .catch(error => {
      console.log(error);
    });
}

export async function getOneUser(id: any) {
  return axios
    .get(`http://localhost:5000/api/users/${id}`)
    .then(response => {
      return response.data.result;
    })
    .catch(error => {
      console.log(error);
    });
}

export async function leaveReview(review: any, id: string) {
  return axios
    .put(`http://localhost:5000/api/users/${id}/review`, review)
    .then(() => {
      store.dispatch("posts/getAllUsers");
      return "Review added";
    });
}
export async function getAllUserReviews(id: string) {
  return axios
    .get(`http://localhost:5000/api/reviews/${id}/all-reviews`)
    .then(response => {
      return response;
    });
}

export async function setLoggedUser(response: any) {
  console.log(response);
  localStorage.setItem("user", JSON.stringify(response.data.user));
  store.commit("SET_LOGGED_USER", response.data.user);
}

export async function logout() {
  localStorage.removeItem("user");
  localStorage.removeItem("jwt");
  router.push("/login");
}

export async function updateUser(update: any, id: string) {
  return axios
    .put(`http://localhost:5000/api/users/${id}`, update)
    .then(response => {
      logout();
      return response.data.result;
    });
}
export async function increaseTrip(id: string) {
  return axios
    .put(`http://localhost:5000/api/users/${id}/trip`)
    .then(response => {
      setLoggedUser(response);
      return response.data.result;
    });
}
export async function increaseSent(id: string) {
  return axios
    .put(`http://localhost:5000/api/users/${id}/sent`)
    .then(response => {
      setLoggedUser(response);
      return response.data.result;
    });
}
export async function deleteUser(id: string) {
  return axios.delete(`http://localhost:5000/api/users/${id}`).then(() => {
    alert("Jūsų paskyra pašalinta.");
    logout();
    router.push("/");
  });
}

export async function sendContactData(post: any, email: string) {
  console.log(post);
  return axios
    .post(`http://localhost:5000/api/posts/send-contact`, {
      post: post,
      email: email
    })
    .then(response => {
      console.log(response);

      return response.data;
    })
    .catch(error => {
      console.log(error);
    });
}
export async function forgotPassword(email: string) {
  return axios
    .post(`http://localhost:5000/api/users/forgot-password`, {
      email: email
    })
    .then(response => {
      console.log(response);

      return response.data;
    })
    .catch(error => {
      console.log(error);
    });
}
export async function changePassword(id: string, password: string) {
  return axios
    .put(`http://localhost:5000/api/users/change-password/${id}`, {
      password: password
    })
    .then(response => {
      console.log(response);
      router.push("/login");
      alert("Slaptažodis pakeistas. \n Galite prisijungti iš naujo");
      return "Password changed";
    })
    .catch(error => {
      console.log(error);
    });
}

export async function login(body: any) {
  return axios
    .post("http://localhost:5000/login", body)
    .then(response => {
      setLoggedUser(response);
      localStorage.setItem("jwt", JSON.stringify(response.data.token));
      store.commit("SET_LOGGED_USER", response.data.user);
      router.push("/home");
    })
    .catch(error => {
      if (error.response.data.message) {
        return error.response.data.message;
      } else {
        console.log(error);
      }
    });
}

export async function googleLogin(user: any) {
  console.log(user);
  const newUser = {
    email: user.Qt,
    password: "",
    firstName: user.eU,
    lastName: user.$R,
    registrationTime: Date.now(),
    phone: "",
    rating: 0,
    tripCount: 0,
    sentCount: 0,
    posts: [],
    review: [],
    isAdmin: false,
    googleId: ""
  };
  localStorage.setItem("user", JSON.stringify(newUser));
  store.commit("SET_LOGGED_USER", newUser);
  router.push("/home");
}

export function isAuthenticated() {
  return localStorage.getItem("user") !== null ? true : false;
}
