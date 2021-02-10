<script lang="ts">
import Menu from "@/components/Menu.vue";
import { onMounted } from "vue";
export default {
  components: {
    Menu
  },
  setup() {
    onMounted(() => {
      console.log("Hello");
    });
  }
};
</script>

<template>
  <div>
    <Menu />
    <main class="main-content">
      <h1 class="section-header">Siuntu app</h1>
      <div class="section-search">
        <form class="search-box">
          <div class="search-field">
            <span class="material-icons">north</span>
            <div class="form-input">
              <input class="input-field" type="text" placeholder="Iš kur?" />
              <span class="focus-border"></span>
            </div>
          </div>
          <div class="search-field">
            <span class="material-icons">south</span>
            <div class="form-input">
              <input class="input-field" type="text" placeholder="Į kur?" />
              <span class="focus-border"></span>
            </div>
          </div>
          <div class="search-field left-border">
            <span class="material-icons">today</span>
            <div class="form-input">
              <input
                class="input-field smaller"
                type="date"
                placeholder="Kada?"
              />
              <span class="focus-border"></span>
            </div>
          </div>
          <div class="search-field">
            <span class="material-icons">aspect_ratio</span>
            <div class="form-input">
              <input
                class="input-field smaller"
                type="text"
                placeholder="Dydis"
              />
              <span class="focus-border"></span>
            </div>
          </div>
        </form>
      </div>
    </main>
  </div>
</template>

<style lang="scss" scoped>
@import "../assets/styles/input-styles.css";
.section-search {
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
      color: rgb(29, 29, 29);
    }

    .smaller {
      width: 125px;
    }
    .left-border {
      border: 1px solid black;
    }
  }

  .form-input {
    margin-bottom: 0;
  }
}
</style>
