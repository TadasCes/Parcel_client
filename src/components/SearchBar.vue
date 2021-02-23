<script lang="ts">
import { reactive, ref } from "vue";
import router from "@/router";
import { useStore } from "vuex";
import CitySearch from "./formComponents/CitySearch.vue";
import moment from "moment";
import * as searchFormValidation from "../utility/searchFormValidation";
// import * as searchFormValidation from "../utility/searchFormValidation";
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
      formValidity.cityStart = searchFormValidation.validateText(
        formData.cityStart
      );
      formValidity.cityEnd = searchFormValidation.validateText(
        formData.cityEnd
      );
      formValidity.date = searchFormValidation.validateDate(formData.date);
      formValidity.size = searchFormValidation.validateSize(formData.size);
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
      <div>
        <div class="search-field">
          <span class="material-icons">north</span>
          <div class="form-input cityStartInput">
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
      <div>
        <div class="search-field">
          <span class="material-icons">south</span>
          <div class="form-input">
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
      <div>
        <div class="search-field">
          <span class="material-icons">today</span>
          <div class="form-input ">
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
      <div>
        <div class="search-field">
          <span class="material-icons">aspect_ratio</span>
          <div class="form-input size-select " id="select-size">
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
          * Pasirinkite dieną
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

.search-box {
  width: 900px;
  height: 100px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 20px;
}

.search-field {
  padding-right: 12px;
  display: flex;
  align-items: center;
  margin-right: 12px;

  input {
    font-weight: bold;
    border: 0;
    width: 100%;
  }

  .input-field::placeholder {
    color: $input-color-light;
  }

  .size-select {
    width: 140px;
  }
}

#select-size {
  width: 100px;
  float: left;
}

.form-input {
  margin-bottom: 0;
}

.error-text {
  position: absolute;
  float: left;
  padding-top: 4px;
  padding-left: 18px;
  font-size: 11px;
  color: $error-color;
}

button {
  margin-top: 12px;
}

@media (max-width: $breakpoint-tablet) {
  .search-box {
    display: block;
    width: 75%;
  }
  .search-field {
    display: block;
  }
}

@media (max-width: $breakpoint-phone) {
  .search-box {
    display: block;
    width: 100%;
  }
  .search-field {
    display: block;
  }
}
</style>
