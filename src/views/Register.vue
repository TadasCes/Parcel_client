<template>
  <div id="register-page" class="">
    <div class="item-padding">
      <div class="row">
        <div class="col-12">
          <h1 class="font-bree">Registracija</h1>
          <hr />
        </div>
      </div>
      <form class="register ">
        <div class="form-inputs">
          <div class="row w-100">
            <div class="col-lg-6 col-md-5">
              <div class="form-input mb-4">
                <input
                  v-model="firstName"
                  type="text"
                  placeholder="Vardas"
                  class="input-field-global input-field"
                  name="First Name"
                />
                <span
                  :class="
                    formValidity.firstName === false
                      ? 'focus-border-error'
                      : 'focus-border'
                  "
                ></span>
                <div v-show="formValidity.email == false" class="error-text">
                  * {{ errorFirstName }}
                </div>
              </div>
            </div>
            <div class="col-lg-6 col-md-5">
              <div class="form-input">
                <input
                  v-model="lastName"
                  type="text"
                  placeholder="Pavardė"
                  class="input-field-global input-field "
                  name="Last name"
                />
                <span
                  :class="
                    formValidity.lastName === false
                      ? 'focus-border-error'
                      : 'focus-border'
                  "
                ></span>
                <div v-show="formValidity.email == false" class="error-text">
                  * {{ errorLastName }}
                </div>
              </div>
            </div>
          </div>

          <div class="row w-100">
            <div class="col-lg-6 col-md-5">
              <div class="form-input mb-4 ">
                <input
                  v-model="email"
                  type="email"
                  placeholder="El. paštas"
                  class="input-field "
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
            </div>
            <div class="col-lg-6 col-md-5">
              <div class="form-input mb-4 ">
                <input
                  v-model="phone"
                  type="phone"
                  placeholder="Telefono nr. +370..."
                  class="input-field "
                  name="phone"
                  pattern="[0-9]{11}"
                />
                <span
                  :class="
                    formValidity.phone === false
                      ? 'focus-border-error'
                      : 'focus-border'
                  "
                ></span>
                <div v-show="formValidity.email == false" class="error-text">
                  * {{ errorPhone }}
                </div>
              </div>
            </div>
          </div>
          <div class="row w-100">
            <div class="col-lg-6 col-md-5">
              <div class="form-input">
                <input
                  v-model="password"
                  type="password"
                  placeholder="Slaptažodis"
                  class="input-field-global input-field"
                  name="Password"
                />
                <span
                  :class="
                    formValidity.password === false
                      ? 'focus-border-error'
                      : 'focus-border'
                  "
                ></span>
                <div v-show="formValidity.email == false" class="error-text">
                  * {{ errorPassword }}
                </div>
              </div>
            </div>
            <div class="col-lg-6 col-md-5">
              <div class="form-input">
                <input
                  type="password"
                  placeholder="Pakartokite slaptažodį"
                  class="input-field-global input-field"
                  name="Repeat Password"
                />
                <span
                  :class="
                    formValidity.password === false
                      ? 'focus-border-error'
                      : 'focus-border'
                  "
                ></span>
                <div v-show="formValidity.email == false" class="error-text">
                  * {{ errorPassword }}
                </div>
              </div>
            </div>
          </div>
          <div class="row w-100">
            <div class="col-lg-6 col-md-5 pt-2">
              <h6 class="float-right font-rubik">Jūsų gimimo data</h6>
            </div>
            <div class="col-lg-6 col-md-5">
              <div class="form-input">
                <input
                  v-model="day"
                  type="date"
                  placeholder="Day"
                  class="input-field-global input-field font-rubik"
                  name="Day"
                />
                <span
                  :class="
                    formValidity.lastName === false
                      ? 'focus-border-error'
                      : 'focus-border'
                  "
                ></span>
                <div v-show="formValidity.email == false" class="error-text">
                  * {{ errorLastName }}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="form-buttons">
          <input
            type="submit"
            value="Registruotis"
            class="input-button "
            @click.prevent="submitNewUser"
          />

          <router-link to="/login" tag="button" class="input-button-secondary">
            Prisijungti
          </router-link>
        </div>
      </form>
    </div>
  </div>
</template>

<script lang="ts">
import { reactive, ref } from "vue";
import { createUser } from "../services/user.api.service";
import { validatePassword } from "../utility/authValidation";
import * as searchFormValidation from "../utility/formValidation";
import router from "@/router";

export default {
  setup() {
    const email = ref("");
    const password = ref("");
    const firstName = ref("");
    const lastName = ref("");
    const phone = ref("");

    const formValidity = reactive({
      email: true,
      password: true,
      firstName: true,
      lastName: true,
      phone: true
    });

    const errorPassword = ref("");
    const errorEmail = ref("");
    const errorLastName = ref("");
    const errorFirstName = ref("");
    const errorPhone = ref("");

    function validateForm(): boolean {
      formValidity.email = searchFormValidation.validateText(email.value);
      formValidity.firstName = searchFormValidation.validateText(
        firstName.value
      );
      formValidity.lastName = searchFormValidation.validateText(lastName.value);
      formValidity.phone = searchFormValidation.validatePhone(phone.value);
      const isPasswordValid = validatePassword(password.value);
      if (isPasswordValid === true) {
        formValidity.password = true;
      } else if (typeof isPasswordValid == "string") {
        errorPassword.value = isPasswordValid;
        return false;
      }
      if (formValidity.email) {
        return true;
      } else {
        errorEmail.value = "Įveskite tinkamą el. paštą";
        return false;
      }
    }

    function submitNewUser() {
      if (validateForm() === true) {
        createUser({
          email: email.value,
          password: password.value,
          firstName: firstName.value,
          lastName: lastName.value,
          phone: phone.value
        });
        alert("Vartotojas sekmingai sukurtas!");
      }
    }

    return {
      email,
      password,
      firstName,
      lastName,
      phone,
      errorEmail,
      errorFirstName,
      errorLastName,
      errorPhone,
      errorPassword,
      submitNewUser,
      formValidity,
      validateForm
    };
  }
};
</script>

<style lang="scss" scoped>
@import "../assets/styles/global.css";
@import "../assets/styles/input-styles.css";

#register-page {
  padding: 100px;
}

.register {
  padding-top: 30px;
}

.input-button {
  padding-right: 20px;
  padding-left: 20px;
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
