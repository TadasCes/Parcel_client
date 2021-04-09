<template>
  <div id="register-page" class="">
    <div class="row">
      <div class="col-12">
        <h1>Register</h1>
      </div>
    </div>
    <form class="register ">
      <div class="form-inputs container">
        <div class="row w-100">
          <div class="col-lg-3 col-md-1"></div>
          <div class="col-lg-3 col-md-5">
            <div class="form-input ">
              <input
                v-model="firstName"
                type="text"
                placeholder="First Name"
                class="input-field-global input-field"
                name="First Name"
              />
              <span class="focus-border"></span>
            </div>
          </div>
          <div class="col-lg-3 col-md-5">
            <div class="form-input">
              <input
                v-model="lastName"
                type="text"
                placeholder="Last Name"
                class="input-field-global input-field "
                name="Last name"
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
                v-model="email"
                type="email"
                placeholder="Email"
                class="input-field "
                name="email"
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
                v-model="password"
                type="password"
                placeholder="Password"
                class="input-field-global input-field"
                name="Password"
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

        <router-link to="/login" tag="button" class="input-button ">
          Sign In instead
        </router-link>
      </div>
    </form>
  </div>
</template>

<script lang="ts">
import { ref } from "vue";
import { createUser } from "../services/user.api.service";
import { validatePassword } from "../utility/authValidation";

export default {
  setup() {
    const email = ref("");
    const password = ref("");
    const firstName = ref("");
    const lastName = ref("");

    function submitNewUser() {
      const isPasswordValid = validatePassword(password.value);
      if (isPasswordValid === true) {
        createUser({
          email: email.value,
          password: password.value,
          firstName: firstName.value,
          lastName: lastName.value
        });
      } else {
        console.log(isPasswordValid);
      }
    }

    return { email, password, firstName, lastName, submitNewUser };
  }
};
</script>

<style scoped>
@import "../assets/styles/global.css";
@import "../assets/styles/input-styles.css";

#register-page {
  padding: 80px;
}

h1 {
  margin-bottom: 60px;
}

.form-inputs {
  margin-bottom: 40px;
}

.register {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
}
</style>
