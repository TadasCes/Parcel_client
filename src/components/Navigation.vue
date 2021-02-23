<script lang="ts">
import { ref } from "vue";
import { isAuthenticated, logout } from "../services/user.api.service";
export default {
  setup() {
    const collapsed = ref(false);
    function logoutUser() {
      logout();
    }

    function openMenu() {
      collapsed.value = !collapsed.value;
      console.log(collapsed.value);
    }

    return { logoutUser, isAuthenticated, openMenu, collapsed };
  }
};
</script>

<template>
  <div id="nav">
    <div class="container">
      <div class="navbar">
        <router-link id="logo" to="/" class="float-left">
          <span>Siunt.io</span>
        </router-link>
        <span class="material-icons burger" @click="openMenu">menu</span>

        <div
          class="nav-content"
          :class="collapsed === true ? 'nav-collapsed' : 'nav-normal'"
        >
          <router-link to="/">
            <!-- <span class="material-icons">search</span> -->
            Siųsti siuntą
          </router-link>
          <router-link to="/register" v-if="isAuthenticated() == false">
            Registruotis
          </router-link>
          <router-link to="/create-post" v-else>
            Paskelbti kelionę
          </router-link>
          <router-link to="/login" v-if="isAuthenticated() == false">
            Prisijungti
          </router-link>
          <router-link to="/login" v-else @click="logoutUser">
            Atsijungti
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
@import "../assets/styles/variables";

#nav {
  background-color: $primary-color;
}

.navbar {
  padding: 15px;
  overflow-x: hidden;
}

#logo {
  font-size: 24px;
  font-weight: bold;
}

a {
  overflow: hidden;
  margin-right: 16px;

  span {
    margin-right: 4px;
  }
}

.burger {
  color: $primary-text-color;
  display: none;
}

.nav-normal {
  display: flex;
  align-content: center;
  float: right;
  a {
    display: block;
  }
}

@media screen and (max-width: $breakpoint-tablet) {
  .navbar {
    width: 100%;
    display: flex;
  }
  .nav-content a {
    display: none;
  }

  .nav-collapsed {
    width: 100%;
    float: right;
    padding-top: 16px;

    a {
      display: inline-block;
      width: 100%;
      text-align: end;
      font-size: 20px;
    }
  }

  .burger {
    display: block;
    float: right;

    &:hover {
      color: initial;

      cursor: pointer;
    }
  }
}
</style>
