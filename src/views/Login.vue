<script lang="ts">
import { reactive, ref } from "vue";
import * as searchFormValidation from "../utility/formValidation";
import gAuth from "vue3-google-auth";

import { login, googleLogin } from "../services/user.api.service";

export default {
  setup() {
    const email = ref("");
    const password = ref("");

    const formValidity = reactive({
      email: true,
      password: true
    });
    const $gAuth = gAuth.useGAuth();

    const errorPassword = ref("");
    const errorEmail = ref("");

    function validateForm(): boolean {
      formValidity.email = searchFormValidation.validateText(email.value);
      formValidity.password = searchFormValidation.validateText(password.value);
      if (formValidity.email) {
        return true;
      } else {
        errorEmail.value = "Įveskite tinkamą el. paštą";
        if (formValidity.password) {
          return true;
        } else {
          errorPassword.value = "Įveskite slaptažodį";
          return false;
        }
      }
    }

    function loginUser() {
      if (validateForm()) {
        login({ email: email.value, password: password.value }).then(error => {
          console.log(error);
          if (error == "Incorrect password.") {
            formValidity.password = false;
            errorPassword.value = error;
          }
          if (error == "No such user.") {
            formValidity.email = false;
            errorEmail.value = error;
          }
        });
      }
    }

    async function loginGoogle() {
      const googleUser = await $gAuth.signIn();
      googleLogin(googleUser.ft);
    }

    return {
      email,
      password,
      loginUser,
      formValidity,
      errorPassword,
      errorEmail,
      googleLogin,
      loginGoogle
    };
  }
};
</script>

<template>
  <div id="login-page" class="container">
    <div class="item-padding">
      <div class="row">
        <div class="col-12">
          <h1 class="font-bree">Prisijungti</h1>
          <hr />
        </div>
      </div>
      <form class="login">
        <div class="form-inputs">
          <div class="form-input mb-4">
            <input
              v-model="email"
              type="email"
              placeholder="El. paštas"
              class="input-field-global input-field"
              name="email"
            />
            <span
              :class="
                formValidity.email === false
                  ? 'focus-border-error'
                  : 'focus-border'
              "
            ></span>
            <div v-show="formValidity.email == false" class="error-text">
              * {{ errorEmail }}
            </div>
          </div>
          <div class="form-input">
            <input
              v-model="password"
              type="password"
              placeholder="Slaptažodis"
              class="input-field-global input-field"
            />
            <span
              :class="
                formValidity.password === false
                  ? 'focus-border-error'
                  : 'focus-border'
              "
            ></span>
            <div v-show="formValidity.password == false" class="error-text">
              * {{ errorPassword }}
            </div>
          </div>
        </div>
        <div class="form-buttons">
          <input
            type="submit"
            value="Prisijungti"
            class="input-button "
            @click.prevent="loginUser"
          />
          <router-link
            to="/register"
            tag="button"
            class="input-button-secondary"
            >Registruotis</router-link
          >
          <button class="input-button-secondary" @click.prevent="loginGoogle()">
            Prisijungti su Google
          </button>

          <router-link
            to="/forgot-password"
            tag="button"
            class="forgot-password font-rubik"
            >Pamiršote slaptažodį?</router-link
          >
        </div>
      </form>
    </div>
  </div>
</template>

<style scoped>
@import "../assets/styles/global.css";
@import "../assets/styles/input-styles.css";

#login-page {
  padding: 100px;
}

.login {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 25em;
  margin: 0 auto;
  padding-top: 30px;
}

.form-inputs {
  margin-bottom: 40px;
}

.forgot-password {
  font-size: 14px;
  color: #ccc;
}
</style>
