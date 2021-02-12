<script lang="ts">
import Menu from "@/components/Menu.vue";
import City from "@/components/formComponents/City.vue";
import CitySearch from "@/components/formComponents/CitySearch.vue";
import { ref } from "vue";
export default {
  components: {
    Menu,
    City,
    CitySearch
  },
  setup() {
    const cityStart = ref("");
    const cityEnd = ref("");
    const date = ref(Date);
    const size = ref(0);

    function searchPost(): void {
      const formData = {
        cityStart: cityStart.value,
        cityEnd: cityEnd.value,
        data: date.value,
        size: size.value
      };
      console.log(formData);
    }

    return { cityStart, cityEnd, date, size, searchPost };
  }
};
</script>

<template>
  <div>
    <Menu />
    <main class="main-content">
      <h1 class="section-header">Siunčiate siuntą?</h1>
      <div class="section-search">
        <form class="search-box">
          <div class="search-field">
            <span class="material-icons">north</span>
            <div class="form-input">
              <!-- <City
                name="cityStart"
                title="Iš kur?"
                @update:city="cityStart = $event"
              /> -->
              <CitySearch />
              <span class="focus-border"></span>
            </div>
          </div>
          <div class="search-field">
            <span class="material-icons">south</span>
            <div class="form-input">
              <City
                name="cityEnd"
                title="Į kur?"
                @update:city="cityEnd = $event"
              />
              <span class="focus-border"></span>
            </div>
          </div>
          <div class="search-field">
            <span class="material-icons">today</span>
            <div class="form-input">
              <input
                v-model="date"
                class="input-field "
                type="date"
                placeholder="Kada?"
              />
              <span class="focus-border"></span>
            </div>
          </div>
          <div class="search-field">
            <span class="material-icons">aspect_ratio</span>
            <div class="form-input size-select">
              <select
                v-model="size"
                name="size"
                class="input-field input-select input-size"
                title="Siuntos dydis"
              >
                <option selected disabled :value="0">Siuntos dydis</option>
                <option :value="1">Mažas</option>
                <option :value="2">Vidutinis</option>
                <option :value="3">Didelis</option>
              </select>
              <span class="focus-border"></span>
            </div>
          </div>
        </form>
      </div>
      <button class="input-button" @click.prevent="searchPost">Ieškoti</button>
    </main>
  </div>
</template>

<style lang="scss" scoped>
@import "../assets/styles/input-styles.css";
@import "../assets/styles/variables.scss";

.main-content {
  height: 100vh;
}

.section-header {
  margin-top: 80px;
}

.section-search {
  margin-top: 40px;
  .search-box {
    width: 900px;
    height: 75px;
    margin: 0 auto;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border: 1px solid rgb(211, 211, 211);
    border-radius: 50px;
    padding: 20px;
    padding-left: 50px;
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

  .form-input {
    margin-bottom: 0;
  }
}

main {
  button {
    margin-top: 40px;
  }
}
</style>
