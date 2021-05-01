<script lang="ts">
import { useStore } from "vuex";
import { computed, onBeforeMount } from "vue";
import Map from "../components/Map.vue";
import moment from "moment";
import Navigation from "../components/Navigation.vue";
import IPost from "@/interfaces/IPost";
import { deleteUser, sendContactData } from "../services/user.api.service";
import router from "@/router";
import { logout } from "../services/user.api.service";

export default {
  props: {
    id: {
      type: String,
      default: ""
    }
  },
  components: {
    Navigation
  },
  setup(props: any) {
    const store = useStore();
    const user = computed(() => store.state.loggedUser);

    function deleteProfile() {
      if (confirm("Ar tikrai norite pašalinti šią paskyrą?")) {
        if (
          confirm(
            "Ištrintos paskyros negalima susigrąžinti. \n Ar esate įsitikinęs?"
          )
        ) {
          deleteUser(user.value._id);
        }
      }
    }

    return { logout, deleteProfile };
  }
};
</script>

<template>
  <div id="edit-post" class="">
    <Navigation />
    <div class="container">
      <div>
        <h2 class="top-header">Nustatymai</h2>
      </div>
      <div class="container">
        <router-link class="input-button" type="button" to="/edit-profile"
          >Redaguoti profilį</router-link
        >
        <router-link class="input-button" type="button" to="/user-posts"
          >Jūsų skelbimai</router-link
        >
        <button class="input-button" @click="deleteProfile">
          Ištrinti paskyrą
        </button>
        <button class="input-button" @click="logout()">Atsijungti</button>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
h2 {
  margin-bottom: 30px;
}
.container {
  margin: 0 auto;
}
.input-button {
  margin: 20px auto;
  display: block;
  width: 200px;
  text-align: center;
}
</style>

function onBeforeMounted(arg0: () => void) { throw new Error('Function not
implemented.'); }
