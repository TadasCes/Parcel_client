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
    pageList: [] as number[],
    pageCount: 0,
    page: 1
  },

  mutations: {
    async SET_POSTS(state: any, posts: IPost[]) {
      await fetchAllPosts().then(result => {
        const pages = Math.ceil(result.length / 5);
        state.pageList.length = 0;
        for (let i = 1; i <= pages; i++) {
          state.pageList.push(i);
        }
        const activePosts: Array<any> = [];
        const archivedPosts: Array<any> = [];
        result.forEach((post: any) => {
          const postDate = post.timeEnd.substring(0, 10);
          const nowDate = moment().format("YYYY-MM-DD");
          if (postDate >= nowDate) {
            if (post.isActive == true) {
              console.log(post);
              activePosts.push(post);
            } else {
              archivedPosts.push(post);
            }
          } else {
            console.log(post);
            archivedPosts.push(post);
          }
        });
        state.posts = posts;
        state.activePosts = activePosts;
        state.archivedPosts = archivedPosts;
      });
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
    async firstPage(state) {
      await fetchLimitedPosts(state.getters.getPage, 5).then(result => {
        state.commit("SET_POSTS", result);
      });
    },
    async nextPage(state) {
      await fetchLimitedPosts(state.getters.getPage + 1, 5).then(result => {
        state.commit("SET_POSTS", result);
        state.commit("INCREASE_PAGE");
      });
    },
    async previousPage(state: any) {
      await fetchLimitedPosts(state.getters.getPage - 1, 5).then(result => {
        state.commit("SET_POSTS", result);
        state.commit("DECREASE_PAGE");
      });
    },
    async getAllPosts(state) {
      const pages = Math.ceil(state.getters.getAllPosts / 5);
      state.commit("SET_PAGE_COUNT", pages);
    },
    async getFilteredPosts(state: any, query: any) {
      await fetchFilteredPosts(query).then(result => {
        state.commit("SET_POSTS", result);
      });
    },
    async getCurrentPage(state: any, query: any) {
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
      dispatch("getAllPosts");
    },
    async deactivateAPost({ dispatch }: any, id: string) {
      await deactivatePost(id);
      dispatch("getAllPosts");
    },
    async activateAPost({ dispatch }: any, id: string) {
      await activatePost(id);
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
