<template>
  <div id="register-page" class="">
    <div class="row">
      <div class="col-12">
        <h2>Register</h2>
      </div>
    </div>
    <form class="register ">
      <div class="form-inputs container">
        <div class="row w-100">
          <div class="col-lg-3 col-md-1"></div>
          <div class="col-lg-3 col-md-5">
            <div class="form-input ">
              <input
                type="text"
                placeholder="First Name"
                class="input-field-global input-field"
                name="First Name"
                v-model="firstName"
              />
              <span class="focus-border"></span>
            </div>
          </div>
          <div class="col-lg-3 col-md-5">
            <div class="form-input">
              <input
                type="text"
                placeholder="Last Name"
                class="input-field-global input-field "
                name="Last name"
                v-model="lastName"
              />
              <span class="focus-border"></span>
            </div>
          </div>
          <div class="col-lg-3 col-md-1"></div>
        </div>
        <div class="row w-100">
          <div class="col-lg-3 col-md-1"></div>

          <div class="col-lg-6 col-md-10">
            <div class="form-input  ">
              <input
                type="email"
                placeholder="Email"
                class="input-field "
                name="email"
                v-model="email"
              />
              <span class="focus-border"></span>
            </div>
          </div>
          <div class="col-lg-3 col-md-1"></div>
        </div>
        <div class="row w-100">
          <div class="col-lg-3 col-md-1"></div>

          <div class="col-lg-3 col-md-5">
            <div class="form-input">
              <input
                type="password"
                placeholder="Password"
                class="input-field-global input-field"
                name="Password"
                v-model="password"
              />
              <span class="focus-border"></span>
            </div>
          </div>
          <div class="col-lg-3 col-md-5">
            <div class="form-input">
              <input
                type="password"
                placeholder="Repeat Password"
                class="input-field-global input-field"
                name="Repeat Password"
              />
              <span class="focus-border"></span>
            </div>
          </div>
          <div class="col-lg-3 col-md-1"></div>
        </div>
      </div>
      <div class="form-buttons">
        <input
          type="submit"
          value="Register"
          class="input-button primary-color"
          @click.prevent="submitNewUser"
        />

        <router-link to="/" tag="button" class="input-button secondary-color">
          Sign In instead
        </router-link>
      </div>
    </form>
  </div>
</template>

<style scoped>
@import "../assets/styles/global.css";
@import "../assets/styles/input-styles.css";

#register-page {
  padding: 100px;
}

h2 {
  margin-bottom: 60px;
}

.register {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
}
</style>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import { ref } from "vue";
import { createUser } from "../services/user.api.service";

export default {
  setup() {
    const email = ref("");
    const password = ref("");
    const firstName = ref("");
    const lastName = ref("");

    function submitNewUser() {
      const user = {
        email: email.value,
        password: password.value,
        firstName: firstName.value,
        lastName: lastName.value
      };
      createUser(user);
    }

    return { email, password, firstName, lastName, submitNewUser };
  }
};
</script>
