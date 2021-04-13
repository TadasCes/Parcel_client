<script lang="ts">
import { reactive, ref } from "vue";
import router from "@/router";
import { useStore } from "vuex";
import CitySearch from "./formComponents/CitySearch.vue";
import moment from "moment";
import * as formValidation from "../utility/formValidation";
// import * as formValidation from "../utility/formValidation";
export default {
  components: {
    CitySearch
  },
  setup() {
    const store = useStore();

    const cityStart = ref("");
    const cityEnd = ref("");
    const date = ref("");
    const size = ref(0);

    const formValidity = reactive({
      cityStart: true,
      cityEnd: true,
      date: true,
      size: true
    });

    function validateForm(formData: any): boolean {
      formValidity.cityStart = formValidation.validateText(formData.cityStart);
      formValidity.cityEnd = formValidation.validateText(formData.cityEnd);
      formValidity.date = formValidation.validateDate(formData.date);
      formValidity.size = formValidation.validateSize(formData.size);
      if (
        formValidity.cityStart &&
        formValidity.cityEnd &&
        formValidity.date &&
        formValidity.size
      ) {
        return true;
      } else {
        return false;
      }
    }

    function searchPost() {
      const formData = {
        cityStart: cityStart.value,
        cityEnd: cityEnd.value,
        date: date.value,
        size: size.value
      };

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
      searchPost,
      validateForm,
      formValidity
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
                />
              </div>
            </div>
            <div v-show="formValidity.date == false" class="error-text">
              * Pasirinkite dieną
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
                  @click="isValid === true"
                />
              </div>
            </div>
            <div v-show="formValidity.date == false" class="error-text">
              * Pasirinkite dieną
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
                  @click="formValidity.date = true"
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
              <span class="material-icons">aspect_ratio</span>
              <div class="size-select form-input" id="select-size">
                <select
                  v-model="size"
                  name="size"
                  class="input-field input-select input-size"
                  title="Siuntos dydis"
                  @click="formValidity.date = true"
                >
                  <option selected disabled :value="0">Dydis</option>
                  <option :value="1">Maža</option>
                  <option :value="2">Vidutinė</option>
                  <option :value="3">Didelė</option>
                </select>
                <span
                  :class="
                    formValidity.date === false
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
  width: 200px;
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
    height: 100px;
  }
}

@media (max-width: $breakpoint-extra-small) {
  .section-search {
    padding-top: 0px;
  }

  .search-box {
    width: 100%;
    height: 200px;
    justify-content: center;
  }

  .form-input {
    width: 100%;
  }
}
</style>
