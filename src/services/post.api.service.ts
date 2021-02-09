import axios from "axios";
import Vue from "vue";
import { useStore } from "vuex";
import moment from "moment";
import store from "../store/index";
import router from "@/router";

function formatAPost(post: any) {
  const timeStart = new Date(post.day + " " + post.timeStart);
  const timeEnd = new Date(post.day + " " + post.timeEnd);
  post.timeStart = moment(timeStart).format();
  post.timeEnd = moment(timeEnd).format();
  return post;
}

export async function fetchAllPosts() {
  return await axios.get("http://localhost:5000/posts").then((response) => {
    return response.data.result;
  });
}

export async function createPost(post: any) {
  return await axios
    .post("http://localhost:5000/posts", formatAPost(post))
    .then((response) => {
      store.dispatch("posts/getAllPosts");
      console.log(response.data.message);
      // router.push("/home");
      return response.data;
    })
    .catch((error) => {
      return Error(error);
    });
}

export async function updatePost(update: any, id: string) {
  return await axios
    .put(`http://localhost:5000/posts/${id}`, formatAPost(update))
    .then((response) => {
      store.dispatch("posts/getAllPosts");

      return response.data.result;
    });
}

export async function deletePost(id: string) {
  return await axios.delete(`http://localhost:5000/posts/${id}`).then((response) => {
    return response.data.result;
  });
}
