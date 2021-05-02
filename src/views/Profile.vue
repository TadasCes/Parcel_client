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
    console.log(user.value);
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

    return { logout, deleteProfile, user };
  }
};
</script>

<template>
  <div id="edit-post" class="">
    <Navigation />
    <div class="container">
      <div class="row">
        <div class="col-6">
          <h2 class="top-header">Jūsų statistika</h2>
          <h4>Pervežta siuntų: {{ user.tripCount }}</h4>
          <h4>Išsiųsta siuntų: {{ user.sentCount }}</h4>
        </div>
        <div class="col-6">
          <div>
            <h2 class="top-header">Veiksmai</h2>
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
      <div></div>
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
