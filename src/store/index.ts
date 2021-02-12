/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { createLogger, createStore } from "vuex";
import { fetchAllPosts, deletePost } from "../services/post.api.service";
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
    posts: [] as IPost[]
  },

  mutations: {
    SET_POSTS(state: any, posts: IPost[]) {
      state.posts = posts;
    }
  },
  actions: {
    async getAllPosts(state: any) {
      const result = await fetchAllPosts();
      state.commit("SET_POSTS", result);
    },
    async deleteAPost({ dispatch }: any, id: string) {
      await deletePost(id);
      dispatch("getAllPosts");
    }
  },
  getters: {
    getAPost: (state: { posts: IPost[] }) => (id: string) => {
      return state.posts.find((post: IPost) => post._id === id);
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
