/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { createLogger, createStore } from "vuex";
import {
  fetchAllPosts,
  deletePost,
  fetchFilteredPosts
} from "../services/post.api.service";
import IUser from "@/interfaces/IUser";
import IPost from "@/interfaces/IPost";

// const users = {
//   namespaced: true,
//   state: {
//     posts: []
//   },
//   mutations: {
//     SET_POSTS(state: any, posts: any) {
//       state.posts = posts;
//     }
//   },
//   actions: {
//     async getAllPosts(state: any) {
//       const result = await fetchAllPosts();
//       state.commit("SET_POSTS", result);
//     }
//   }
// };

const posts = {
  namespaced: true,
  state: {
    posts: [] as IPost[],
    postInMemory: {} as IPost
  },

  mutations: {
    SET_POSTS(state: any, posts: IPost[]) {
      state.posts = posts;
    },
    SAVE_POST(state: any, post: IPost) {
      state.postInMemory = post;
    },
    FORGET(state: any, post: IPost) {
      state.postInMemory = {};
    }
  },
  actions: {
    async getAllPosts(state: any) {
      await fetchAllPosts().then(result => {
        state.commit("SET_POSTS", result);
      });
    },
    async getFilteredPosts(state: any, query: any) {
      await fetchFilteredPosts(query).then(result => {
        state.commit("SET_POSTS", result);
      });
    },
    async savePostInMemory(state: any, query: any) {
      state.commit("SAVE_POST", query);
    },
    async removeFromMemory(state: any, query: any) {
      state.commit("FORGET", query);
    },
    async deleteAPost({ dispatch }: any, id: string) {
      await deletePost(id);
      dispatch("getAllPosts");
    }
  },
  getters: {
    getAPost: (state: { posts: IPost[] }) => (id: string) => {
      return state.posts.find((post: IPost) => post._id === id);
    },
    getAPostInMemory: (state: { postInMemory: IPost }) => {
      console.log(state.postInMemory);
      return state.postInMemory;
    }
  }
};

export default createStore({
  plugins: [createLogger()],
  state: {
    loggedUser: {} as IUser
  },
  mutations: {
    SET_LOGGED_USER(state, user: IUser) {
      state.loggedUser = user;
    }
  },
  actions: {},
  modules: { posts }
});
