import IPost from "@/interfaces/IPost";
import axios from "axios";
import moment from "moment";
import store from "../store/index";

function formatAPost(post: any) {
  const timeStart = new Date(post.day + " " + post.timeStart);
  const timeEnd = new Date(post.day + " " + post.timeEnd);
  post.timeStart = moment(timeStart).format();
  post.timeEnd = moment(timeEnd).format();
  return post;
}

export async function fetchAllPosts() {
  return axios.get("http://localhost:5000/posts").then(response => {
    return response.data.result;
  });
}

export async function fetchFilteredPosts(query: any) {
  return axios
    .post("http://localhost:5000/posts/filter", query)
    .then(response => {
      // console.log(response.data.result);
      return response.data.result;
    });
}

export async function createPost(post: IPost) {
  return axios
    .post("http://localhost:5000/posts", formatAPost(post))
    .then(response => {
      store.dispatch("posts/getAllPosts");
      console.log(response.data.message);
      // router.push("/home");
      return response.data;
    })
    .catch(error => {
      return Error(error);
    });
}

export async function updatePost(update: any, id: string) {
  return axios
    .put(`http://localhost:5000/posts/${id}`, formatAPost(update))
    .then(response => {
      store.dispatch("posts/getAllPosts");

      return response.data.result;
    });
}

export async function deletePost(id: string) {
  return axios.delete(`http://localhost:5000/posts/${id}`).then(response => {
    return response.data.result;
  });
}
