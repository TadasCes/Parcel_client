<template>
  <router-view />
</template>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100vh;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>

<script lang="ts">
import { useStore } from "vuex";

export default {
  name: "App",
  setup() {
    const store = useStore();
    store.dispatch("posts/getAllPosts");

    const user = localStorage.getItem("user");
    if (user) {
      store.commit("SET_LOGGED_USER", JSON.parse(user));
    }
  }
};
</script>
