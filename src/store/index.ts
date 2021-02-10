import { createLogger, createStore } from "vuex";
import { fetchAllPosts, deletePost } from "../services/post.api.service";
import IUser from "../interfaces/IUser";

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
    posts: []
  },

  mutations: {
    SET_POSTS(state: any, posts: any) {
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
    getAPost: (state: any) => (id: string) => {
      return state.posts.find((post: any) => post._id === id);
    }
  }
};

export default createStore({
  plugins: [createLogger()],
  state: {
    loggedUser: <IUser>{}
  },
  mutations: {
    SET_LOGGED_USER(state, user: IUser) {
      state.loggedUser = user;
    }
  },
  actions: {},
  modules: { posts }
});
