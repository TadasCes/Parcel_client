<script lang="ts">
import { ref } from "vue";
import {
  getOneUser,
  isAuthenticated,
  logout,
  setLoggedUser
} from "../services/user.api.service";
import store from "@/store";
import router from "@/router";
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

    async function goToProfile() {
      let user: any = localStorage.getItem("user");
      user = JSON.parse(user);
      console.log(user);
      await getOneUser(user._id).then(response => {
        localStorage.setItem("user", JSON.stringify(response));
        store.commit("SET_LOGGED_USER", response);

        router.push("/profile");
      });
    }

    return { logoutUser, goToProfile, isAuthenticated, openMenu, collapsed };
  }
};
</script>

<template>
  <div id="nav">
    <div class="container">
      <div class="navbar font-rubik">
        <router-link id="logo" to="/" class="float-left">
          <span>Siunt.io</span>
        </router-link>
        <span class="material-icons burger" @click="openMenu">menu</span>

        <div
          class="nav-content"
          :class="collapsed === true ? 'nav-normal' : 'nav-collapsed'"
        >
          <div v-if="isAuthenticated() == false" class="menu-buttons">
            <router-link to="/register">
              Registruotis
            </router-link>
            <router-link to="/login">
              Prisijungti
            </router-link>
          </div>
          <div v-else class="menu-buttons">
            <ul class="side-menu">
              <li>
                <router-link to="/home">Naršyti skelbimus</router-link>
              </li>
              <li>
                <router-link to="/create-post">Patalpinti skelbimą</router-link>
              </li>
              <li>
                <span @click="goToProfile()" class="mr-3">Profilis</span>
              </li>
              <li>
                <router-link to="/login" @click="logoutUser">
                  Atsijungti
                </router-link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import "../assets/styles/variables";

#nav {
  background-color: $primary-color;
  box-shadow: 1px 5px 10px #b9b9b9;
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

.nav-collapsed {
  display: flex;
  align-content: center;
  float: right;
  a {
    display: block;
  }
}

.side-menu {
  display: flex;
  text-decoration: none;
  list-style: none;
  float: right;
}

.nav-content {
  padding-top: 15px;
}
@media screen and (max-width: $breakpoint-medium) {
  .side-menu {
    flex-direction: column;
  }
  .navbar {
    justify-content: space-between;
  }
  .nav-content a {
    display: none;
  }
  .nav-collapsed {
    display: none;
  }
  .nav-normal {
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
class="menu-buttons"
