<script lang="ts">
import { reactive, ref } from "vue";
import router from "@/router";
import { useStore } from "vuex";
import CitySearch from "./formComponents/CitySearch.vue";
import moment from "moment";
import { VTooltip } from "v-tooltip";
import * as formValidation from "../utility/formValidation";
// import * as formValidation from "../utility/formValidation";

export default {
  components: {
    CitySearch
  },
  directive: {
    VTooltip
  },
  setup() {
    const store = useStore();

    const cityStart = ref("");
    const cityEnd = ref("");
    const date = ref("");
    const size = ref(0);
    const type = ref(0);

    const formValidity = reactive({
      cityStart: true,
      cityEnd: true,
      date: true,
      size: true,
      type: true
    });

    function validateForm(formData: any): boolean {
      formValidity.cityStart = formValidation.validateText(formData.cityStart);
      formValidity.cityEnd = formValidation.validateText(formData.cityEnd);
      formValidity.date = formValidation.validateDate(formData.date);
      formValidity.type = formValidation.validateSize(formData.type);
      formValidity.size = formValidation.validateSize(formData.size);
      if (
        formValidity.cityStart &&
        formValidity.cityEnd &&
        formValidity.date &&
        formValidity.type
      ) {
        return true;
      } else {
        return false;
      }
    }

    function clearErrors() {
      formValidity.cityStart = true;
      formValidity.cityEnd = true;
      formValidity.date = true;
      formValidity.type = true;
      formValidity.size = true;
    }

    function searchPost() {
      const formData = {
        cityStart: cityStart.value,
        cityEnd: cityEnd.value,
        date: date.value,
        type: type.value,
        size: size.value
      };
      console.log(validateForm(formData));
      if (validateForm(formData)) {
        store.dispatch("posts/getFilteredPosts", formData);
        router.push("/home");
      }
    }

    return {
      cityStart,
      cityEnd,
      date,
      size,
      type,
      searchPost,
      validateForm,
      formValidity,
      clearErrors
    };
  }
};
</script>

<template>
  <div class="section-search">
    <form class="search-box">
      <div class="container">
        <div class="row">
          <div class="form-field col-lg-3 col-md-6 col-sm-6 col-12">
            <div class="search-field">
              <span class="material-icons">north</span>
              <div class="cityStartInput form-input zindex-dropdown">
                <CitySearch
                  title="Iš kur siunčiate?"
                  :is-valid="formValidity.cityStart"
                  @update:city="cityStart = $event"
                  @click="clearErrors()"
                />
              </div>
            </div>
            <div v-show="formValidity.cityStart == false" class="error-text">
              * Pasirinkite miestą
            </div>
          </div>
          <div class="form-field col-lg-3 col-md-6 col-sm-6 col-12">
            <div class="search-field">
              <span class="material-icons">south</span>
              <div class="form-input zindex-dropdown">
                <CitySearch
                  title="Į kur siunčiate?"
                  :is-valid="formValidity.cityEnd"
                  @update:city="cityEnd = $event"
                  @click="clearErrors()"
                />
              </div>
            </div>
            <div v-show="formValidity.cityEnd == false" class="error-text">
              * Pasirinkite miestą
            </div>
          </div>
          <div class="form-field col-lg-3 col-md-6 col-sm-6 col-12">
            <div class="search-field">
              <span class="material-icons">today</span>
              <div class="form-input">
                <input
                  v-model="date"
                  class="input-field "
                  type="date"
                  placeholder="Kada?"
                  @click="clearErrors()"
                />
                <span
                  :class="
                    formValidity.date === false
                      ? 'focus-border-error'
                      : 'focus-border'
                  "
                ></span>
              </div>
            </div>
            <div v-show="formValidity.date == false" class="error-text">
              * Pasirinkite dieną
            </div>
          </div>

          <div class="form-field col-lg-3 col-md-6 col-sm-6 col-12">
            <div class="search-field">
              <span class="material-icons">help_outline</span>
              <div class="size-select form-input" id="select-size">
                <select
                  v-model="type"
                  name="size"
                  class="input-field input-select input-size"
                  title="Siuntos tipas"
                  @click="clearErrors()"
                >
                  <option selected disabled :value="0">Tipas</option>
                  <option :value="1">Siunta</option>
                  <option :value="2">Kelionė</option>
                </select>
                <span
                  :class="
                    formValidity.type === false
                      ? 'focus-border-error'
                      : 'focus-border'
                  "
                ></span>
              </div>
            </div>
            <div v-show="formValidity.type == false" class="error-text">
              * Pasirinkite tipą
            </div>
          </div>
          <div class="row pl-3">
            <div v-if="type == 1">
              <div class="form-field col-lg-6 col-md-10 col-12 select-size">
                <div class="search-field">
                  <span class="material-icons">aspect_ratio</span>
                  <div class="size-select form-input" id="select-size">
                    <select
                      v-model="size"
                      name="size"
                      class="input-field input-select input-size"
                      title="Siuntos dydis"
                      @click="clearErrors()"
                    >
                      <option selected disabled :value="0">Dydis</option>
                      <option :value="1">Maža: ~9x38x64cm</option>
                      <option :value="2">Vidutinė: ~19x38x64cm </option>
                      <option :value="3">Didelė: ~39x38x64cm </option>
                    </select>

                    <span
                      :class="
                        formValidity.size === false
                          ? 'focus-border-error'
                          : 'focus-border'
                      "
                    ></span>
                  </div>
                </div>
                <div v-show="formValidity.size == false" class="error-text">
                  * Pasirinkite dydį
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
    <button class="input-button smaller" @click.prevent="searchPost">
      Ieškoti
    </button>
  </div>
</template>

<style lang="scss" scoped>
@import "../assets/styles/input-styles.css";
@import "../assets/styles/variables.scss";
.section-search {
  padding-top: 26px;
}

.search-box {
  width: 900px;
  margin: 0 auto;
  display: flex;
  align-items: flex-start;
  margin-top: 20px;
  padding-bottom: 30px;
}

.search-field {
  padding-right: 12px;
  display: flex;
  align-items: flex-start;
  input {
    font-weight: bold;
    border: 0;
    width: 100%;
  }

  .input-field::placeholder {
    color: $input-color-light;
  }
}

.form-input {
  width: 175px;
}

.size-select {
  width: 450px;
}
.select-size {
  margin-top: 25px;
}

.input-size {
  font-weight: bold;
}

.form-field {
  z-index: 0;
}

button {
  margin-top: 12px;
}

@media (max-width: $breakpoint-small) {
  .search-box {
    width: 75%;
    height: 150px;
  }
}

@media (max-width: $breakpoint-extra-small) {
  .section-search {
    padding-top: 0px;
  }

  .search-box {
    width: 100%;
    height: 250px;
    justify-content: center;
  }

  .form-input {
    width: 100%;
  }
}
</style>
