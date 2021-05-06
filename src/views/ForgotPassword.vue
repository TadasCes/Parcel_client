<template>
  <div class="container box">
    <router-link class="back-link" to="/login">
      <i class="fas fa-arrow-left"></i>
      <span>Grįžti</span>
    </router-link>
    <div class="item-card">
      <div class="item-padding">
        <h3>Pamiršote slaptažodį?</h3>
        <p>
          Įveskite savo paskyros el. paštą ir į jį gausite nuorodą, kurią
          paspaudus, galėsite pakeisti slaptažodį.
        </p>
        <input
          v-model="email"
          type="email"
          placeholder="El. paštas"
          class="input-field-global input-field"
          name="email"
        />
        <button class="input-button" @click.prevent="sendPasswordResetEmail()">
          Gauti nuorodą
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { forgotPassword } from "../services/user.api.service";
import { reactive, ref } from "vue";

export default {
  setup() {
    const email = ref("");

    function sendPasswordResetEmail() {
      forgotPassword(email.value);
    }

    return { sendPasswordResetEmail, email };
  }
};
</script>
<style lang="scss" scoped>
.box {
  width: 25em;
  margin-top: 150px;
}
.item-card {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 25em;
  margin: 0 auto;
}
button {
  margin-top: 50px;
}
</style>
