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
  return axios.get(`http://localhost:5000/api/posts`).then(response => {
    return response.data.result;
  });
}

export async function getPostAuthor(authorId: string) {
  return axios
    .get(`http://localhost:5000/api/users/${authorId}`)
    .then(response => {
      return response.data;
    });
}

export async function fetchFilteredPosts(query: any) {
  console.log("ateina");
  return axios
    .post(`http://localhost:5000/api/posts/filter`, query)
    .then(response => {
      console.log(response);
      return response.data.result;
    });
}

export async function createPost(post: IPost) {
  return axios
    .post("http://localhost:5000/api/posts", formatAPost(post))
    .then(response => {
      store.dispatch("posts/getAllPosts");
      console.log(response.data.message);
      return response.data;
    })
    .catch(error => {
      return Error(error);
    });
}

export async function updatePost(update: any, id: string) {
  return axios
    .put(`http://localhost:5000/api/posts/${id}`, formatAPost(update))
    .then(response => {
      store.dispatch("posts/getAllPosts");

      return response.data.result;
    });
}

export async function deletePost(id: string) {
  return axios
    .delete(`http://localhost:5000/api/posts/${id}`)
    .then(response => {
      return response.data.result;
    });
}
