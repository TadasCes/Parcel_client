<script lang="ts">
import { isUserLoggedIn, logout } from "../services/user.api.service";
export default {
  setup() {
    function logoutUser() {
      logout();
    }

    return { logoutUser, isUserLoggedIn };
  }
};
</script>

<template>
  <div id="nav">
    <div class="container">
      <router-link id="logo" to="/home"></router-link>
      <div class="nav">
        <router-link to="/">
          <span class="material-icons">search</span>
          Siųsti siuntą
        </router-link>
        <router-link to="/register" v-if="isUserLoggedIn() == false">
          Registruotis
        </router-link>
        <router-link to="/create-post" v-else>
          Paskelbti kelionę
        </router-link>
        <router-link to="/login" v-if="isUserLoggedIn() == false">
          Prisijungti
        </router-link>
        <router-link to="/login" v-else @click="logoutUser">
          Atsijungti
        </router-link>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
@import "../assets/styles/variables";

#nav {
  padding: 15px;
  overflow-x: hidden;

  #logo {
    height: 50px;
    width: 150px;
    background: rgb(208, 238, 219);
  }

  a {
    color: $primary-color;
    font-weight: bold;
    overflow: hidden;
    margin-right: 16px;
    display: flex;
    align-items: center;

    span {
      margin-right: 4px;
    }
  }

  .container {
    display: flex;
    justify-content: space-between;
  }
}
</style>
