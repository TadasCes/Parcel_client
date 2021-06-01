/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { createLogger, createStore } from "vuex";
import {
  fetchAllPosts,
  deletePost,
  fetchFilteredPosts,
  fetchFilteredParcels,
  fetchLimitedPosts,
  fetchAllValidPosts,
  activatePost,
  deactivatePost
} from "../services/post.api.service";
import IUser from "@/interfaces/IUser";
import IPost from "@/interfaces/IPost";
import IParcel from "@/interfaces/IParcel";
import moment from "moment";

const posts = {
  namespaced: true,
  state: {
    posts: [] as IPost[],
    activePosts: [] as IPost[],
    archivedPosts: [] as IPost[],
    parcels: [] as IPost[],
    postInMemory: {} as IPost,
    pageCount: 1,
    page: 1
  },

  mutations: {
    SET_FRONT_POSTS(state: any, posts: IPost[]) {
      state.posts = posts;
    },
    SET_ACTIVE_POSTS(state: any, posts: IPost[]) {
      state.activePosts = posts;
    },
    SET_ARCHIVED_POSTS(state: any, posts: IPost[]) {
      state.archivedPosts = posts;
    },
    SAVE_POST(state: any, post: IPost) {
      state.postInMemory = post;
    },
    INCREASE_PAGE(state: any) {
      state.page += 1;
    },
    DECREASE_PAGE(state: any) {
      state.page -= 1;
    },
    RESET_PAGE(state: any) {
      state.page = 1;
    },
    SET_PAGE_COUNT(state: any, count: any) {
      state.pageCount = count;
    },
    FORGET(state: any, post: IPost) {
      state.postInMemory = {};
    }
  },
  actions: {
    async getPosts(state) {
      await fetchLimitedPosts(1, 5).then(result => {
        const activePosts: Array<any> = [];
        const archivedPosts: Array<any> = [];
        result.forEach((post: any) => {
          const postDate = post.day;
          const nowDate = moment().format("YYYY-MM-DD");
          if (postDate >= nowDate) {
            if (post.isActive == true) {
              activePosts.push(post);
            } else {
              archivedPosts.push(post);
            }
          } else {
            archivedPosts.push(post);
          }
        });
        state.commit("SET_FRONT_POSTS", activePosts);
      });
    },
    async nextPage(state) {
      await fetchLimitedPosts(state.getters.getPage + 1, 5).then(result => {
        const activePosts: Array<any> = [];
        result.forEach((post: any) => {
          const postDate = post.day;
          const nowDate = moment().format("YYYY-MM-DD");
          if (postDate >= nowDate) {
            if (post.isActive == true) {
              activePosts.push(post);
            }
          }
        });
        state.commit("SET_FRONT_POSTS", activePosts);
        state.commit("INCREASE_PAGE");
      });
    },
    async previousPage(state: any) {
      await fetchLimitedPosts(state.getters.getPage - 1, 5).then(result => {
        const activePosts: Array<any> = [];
        result.forEach((post: any) => {
          const postDate = post.day;
          const nowDate = moment().format("YYYY-MM-DD");
          if (postDate >= nowDate) {
            if (post.isActive == true) {
              activePosts.push(post);
            }
          }
        });
        state.commit("SET_FRONT_POSTS", activePosts);
        state.commit("DECREASE_PAGE");
      });
    },
    async setPages(state) {
      await fetchAllValidPosts().then(result => {
        const pages = Math.ceil(result.length / 5);
        console.log(result.length);
        state.commit("SET_PAGE_COUNT", pages);
      });
    },
    async getFilteredPosts(state: any, query: any) {
      await fetchFilteredPosts(query).then(result => {
        state.commit("SET_FRONT_POSTS", result);
      });
    },
    async getCurrentPage(state: any) {
      return state.getters.getPage;
    },
    async savePostInMemory(state: any, query: any) {
      state.commit("SAVE_POST", query);
    },
    async removeFromMemory(state: any, query: any) {
      state.commit("FORGET", query);
    },

    async decreasePage(state: any) {
      state.commit("DECREASE_PAGE");
    },
    async resetPage(state: any) {
      state.commit("RESET_PAGE");
    },
    async deleteAPost({ dispatch }: any, id: string) {
      await deletePost(id);
      dispatch("getPosts");
    },
    async deactivateAPost({ dispatch }: any, id: string) {
      await deactivatePost(id);
      dispatch("getPosts");
    },
    async activateAPost({ dispatch }: any, id: string) {
      await activatePost(id);
      dispatch("getPosts");
    }
  },
  getters: {
    getAPost: (state: { posts: IPost[] }) => (id: string) => {
      return state.posts.find((post: IPost) => post._id === id);
    },
    getAPostInMemory: (state: { postInMemory: IPost }) => {
      console.log(state.postInMemory);
      return state.postInMemory;
    },
    getPage: (state: any) => {
      return state.page;
    },
    getAllPosts: (state: any) => {
      return state.posts;
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
