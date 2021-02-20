<script lang="ts">
import Menu from "@/components/Menu.vue";

export default {
  components: {
    Menu
  }
};
</script>

<template>
  <div>
    <Menu />
    <main class="main-content">
      <div class="section-header">
        <h1>Persiųskite siuntą lengviau</h1>
        <h6>Perduokite siuntą keliaujantiems žmonemss</h6>
      </div>
      <div class="section-options">
        <button class="input-button">
          <span class="material-icons align-middle">search</span>
          <router-link to="/home">
            Siųsti siuntą
          </router-link>
        </button>
        <button class="input-button">
          <span class="material-icons align-middle">directions_car</span>
          <router-link to="/register">
            Siūlyti pervežimą
          </router-link>
        </button>
      </div>
    </main>
  </div>
</template>

<style lang="scss" scoped>
@import "../assets/styles/input-styles.css";
@import "../assets/styles/variables.scss";

.main-content {
  height: 100vh;
}

.section-options {
  display: flex;
  justify-content: center;
}

.input-button {
  margin: 16px;
  margin-top: 60px;
}

a {
  text-decoration: none;
  color: black;
}

.section-header {
  margin-top: 80px;
}
</style>
