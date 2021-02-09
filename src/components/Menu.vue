<template>
  <div id="nav">
    <div class="nav-upper">
      <router-link to="/home">Home</router-link>
      <router-link to="/home">Messages</router-link>
      <router-link to="/home">Profile</router-link>
    </div>
    <div class="nav-lower">
      <router-link to="/home">Settings</router-link>
      <router-link to="/" @click="logoutUser">Exit</router-link>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
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

<style lang="scss">
@import "../assets/styles/variables";

#nav {
  background-color: $primary-color;
  width: 100%;
  padding-top: 30px;
  overflow-x: hidden;
  display: flex;
  justify-content: space-between;

  &.nav-lower {
    display: block;
  }

  a {
    font-weight: bold;
    color: #2c3e50;
    overflow: hidden;
    padding-left: 10px;

    &.router-link-exact-active {
      color: $accent-color;
    }
  }
}
</style>
