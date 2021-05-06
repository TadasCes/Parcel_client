<script lang="ts">
import City from "../components/formComponents/City.vue";
import { useStore } from "vuex";
import { computed, onMounted, ref } from "vue";
import { updateUser } from "../services/user.api.service";
import router from "@/router";
import moment from "moment";
import Navigation from "../components/Navigation.vue";

export default {
  components: {
    Navigation
  },

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  setup() {
    const store = useStore();
    const user = computed(() => store.state.loggedUser);
    const firstName = ref(user.value.firstName);
    const lastName = ref(user.value.lastName);
    const email = ref(user.value.email);
    const password = ref(user.value.password);
    const phone = ref(user.value.phone);

    function updateAUser(): void {
      const editedUser = {
        firstName: firstName.value,
        lastName: lastName.value,
        email: email.value,
        password: password.value,
        phone: phone.value
      };
      console.log(editedUser);
      updateUser(editedUser, user.value._id);
      alert("Profilis atnaujintas. Prašome prisijungti iš naujo.");
    }

    return {
      updateAUser,
      firstName,
      lastName,
      email,
      phone,
      password
    };
  }
};
</script>

<template>
  <div id="edit-post" class="">
    <Navigation />
    <div class="item-padding">
      <h2>Redaguoti profilį</h2>
      <hr />
      <form class="form">
        <div class="form-inputs container">
          <div class="row w-50">
            <div class="col-12">
              <label for="from">Vardas:</label>
              <input
                v-model="firstName"
                type="text"
                class="input-field-global input-field"
                name="firstName"
              />
              <span class="focus-border"></span>
            </div>
            <div class="col-12">
              <label for="to">Pavardė:</label>
              <input
                v-model="lastName"
                type="text"
                class="input-field-global input-field"
                name="lastName"
              />
              <span class="focus-border"></span>
            </div>
            <div class="form-input col-12 ">
              <label for="to">El. paštas:</label>
              <input
                v-model="email"
                type="text"
                class="input-field-global input-field"
                name="Email"
              />
              <span class="focus-border"></span>
            </div>
            <div class="form-input col-12 ">
              <label for="to">Tel. numeris:</label>
              <input
                v-model="phone"
                type="text"
                class="input-field-global input-field"
                name="Phone"
              />
              <span class="focus-border"></span>
            </div>
            <div class="form-input col-12 ">
              <label for="to">Senas slaptažodis:</label>
              <input
                v-model="password"
                type="password"
                class="input-field-global input-field"
                name="password"
              />
              <span class="focus-border"></span>
            </div>
            <div class="form-input col-12 ">
              <label for="to">Naujas slaptažodis:</label>
              <input
                v-model="password"
                type="password"
                class="input-field-global input-field"
                name="password"
              />
              <span class="focus-border"></span>
            </div>
            <div class="d-flex">
              <input
                type="submit"
                value="Atnaujinti"
                class="input-button mr-3"
                @click.prevent="updateAUser"
              />
              <router-link
                to="/profile"
                tag="button"
                class="input-button input-button-secondary mr-3"
              >
                Atgal
              </router-link>
            </div>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import "../assets/styles/global.css";
@import "../assets/styles/input-styles.css";
#edit-post {
  padding-bottom: 50px;
}
.col-12 {
  margin-bottom: 40px;
}

label {
  float: left;
  font-weight: bold;
  font-size: 20px;
}

.form {
  padding-bottom: 30px;
  padding-top: 30px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
}

.d-flex {
  margin: 0 auto;
}
</style>
