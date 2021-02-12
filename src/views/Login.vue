<script lang="ts">
import { ref } from "vue";
import { login } from "../services/user.api.service";

export default {
  setup() {
    const email = ref("");
    const password = ref("");

    function loginUser() {
      login({ email: email.value, password: password.value });
    }

    return { email, password, loginUser };
  }
};
</script>

<template>
  <div id="login-page" class="container">
    <div class="row">
      <div class="col-12">
        <h1>Login</h1>
      </div>
    </div>
    <form class="login">
      <div class="form-inputs">
        <div class="form-input">
          <input
            v-model="email"
            type="email"
            placeholder="Email"
            class="input-field-global input-field"
            name="email"
          />
          <span class="focus-border"></span>
        </div>
        <div class="form-input">
          <input
            v-model="password"
            type="password"
            placeholder="Password"
            class="input-field-global input-field"
          />
          <span class="focus-border"></span>
        </div>
      </div>
      <div class="form-buttons">
        <input
          type="submit"
          value="Sign In"
          class="input-button primary-color"
          @click.prevent="loginUser"
        />
        <router-link to="/register" tag="button" class="input-button"
          >Sign Up</router-link
        >
        <span class="forgot-password">Forgot password?</span>
      </div>
    </form>
  </div>
</template>

<style scoped>
@import "../assets/styles/global.css";
@import "../assets/styles/input-styles.css";

#login-page {
  padding: 100px;
}

h1 {
  margin-bottom: 40px;
}

.login {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 25em;
  margin: 0 auto;
}

.form-inputs {
  margin-bottom: 28px;
}

.forgot-password {
  font-size: 14px;
  color: #ccc;
}
</style>
