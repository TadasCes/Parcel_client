<script lang="ts">
import { logout } from "../services/user.api.service";
export default {
  setup() {
    function logoutUser() {
      logout();
    }
    return { logoutUser };
  }
};
</script>

<template>
  <div id="nav">
    <div class="container">
      <router-link id="logo" to="/home"></router-link>
      <div class="nav">
        <router-link to="/home">
          <span class="material-icons">search</span>
          Siųsti
        </router-link>
        <router-link to="/home">
          <span class="material-icons">time_to_leave</span>
          Keliauti
        </router-link>
        <router-link to="/home">
          Registruotis
        </router-link>
        <router-link to="/" @click="logoutUser">
          Prisijungti
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
    color: $secondary-color;
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
