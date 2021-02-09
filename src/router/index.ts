import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Login from "../views/Login.vue";
import Register from "../views/Register.vue";
import Home from "../views/Home.vue";
import CreatePost from "../views/CreatePost.vue";
import EditPost from "../views/EditPost.vue";
import Admin from "../views/Admin.vue";
import Details from "../views/Details.vue";
import store from "../store/index";
import { computed, ComputedRef, Ref } from "vue";
import IUser from "@/interfaces/IUser";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
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
    path: "/admin",
    name: "Admin",
    component: Admin,
    meta: {
      requiresAuth: true
    },
    beforeEnter: (to, from, next) => {
      const user: ComputedRef<IUser> = computed(() => store.state.loggedUser);
      console.log(user.value);
      if (user.value.isAdmin) {
        next();
      } else {
        next("/home");
      }
      next();
    }
  },
  {
    path: "/home",
    name: "Home",
    component: Home,
    meta: {
      requiresAuth: true
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
    props: true,
    meta: {
      requiresAuth: true
    }
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
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
