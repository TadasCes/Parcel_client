import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Login from "../views/Login.vue";
import Register from "../views/Register.vue";
import Home from "../views/Home.vue";
import EditPost from "../views/EditPost.vue";
import Details from "../views/Details.vue";
import Landing from "../views/Landing.vue";
import CreatePost from "../views/CreatePost.vue";
import UserPosts from "../views/UserPosts.vue";
import Chat from "../views/Chat.vue";
import Maps from "../views/Maps.vue";
import store from "../store/index";
import Vue from "vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Landing",
    component: Landing,
    meta: {
      guest: true
    }
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
    meta: {
      guest: true
    }
  },
  {
    path: "/register",
    name: "Register",
    component: Register,
    meta: {
      guest: true
    }
  },
  {
    path: "/home",
    name: "Home",
    component: Home,
    meta: {
      guest: true
    }
  },
  {
    path: "/create-post",
    name: "CreatePost",
    component: CreatePost,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/edit-post/:id",
    name: "EditPost",
    component: EditPost,
    props: true,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/details/:id",
    name: "Details",
    component: Details,
    props: true
  },
  {
    path: "/chat",
    name: "Chat",
    component: Chat
  },
  {
    path: "/user-posts",
    name: "UserPosts",
    component: UserPosts
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (localStorage.getItem("jwt") == null) {
      next({
        path: "/",
        query: { redirect: to.fullPath }
      });
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
