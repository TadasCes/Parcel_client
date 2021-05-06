<template>
  <div class="container box">
    <div class="item-card row">
      <div class="item-padding">
        <div class="form-inputs">
          <h3 class="mb-5">Slaptažodžio pakeitimas</h3>
          <div class="form-input col-6 ">
            <label for="to">Naujas slaptažodis:</label>
            <input
              v-model="password"
              type="password"
              class="input-field-global input-field"
              name="password"
            />
            <span class="focus-border"></span>
          </div>
          <div class="form-input col-6 ">
            <label for="to">Pakartokite:</label>
            <input
              type="password"
              class="input-field-global input-field"
              name="password"
            />
            <span class="focus-border"></span>
          </div>
          <button class="input-button" @click.prevent="changeUserPassword()">
            Atnaujinti
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { changePassword } from "../services/user.api.service";
import { reactive, ref } from "vue";
import router from "@/router";

export default {
  setup() {
    const password = ref("");

    function changeUserPassword() {
      changePassword(router.currentRoute.value.params.id, password.value);
    }

    return { changeUserPassword, password };
  }
};
</script>
<style lang="scss" scoped>
@import "../assets/styles/global.css";
@import "../assets/styles/input-styles.css";

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
