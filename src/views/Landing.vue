<script lang="ts">
import Navigation from "@/components/Navigation.vue";

export default {
  components: {
    Navigation
  }
};
</script>

<template>
  <div>
    <Navigation />
    <div class="main-content item-padding">
      <div class="section-header">
        <h1>Persiųskite siuntą lengviau</h1>
        <h6>Perduokite siuntą keliaujantiems žmonėms</h6>
      </div>
      <div class="section-options">
        <router-link to="/home" tag="button" class="input-button">
          <span class="material-icons align-middle">search</span>
          Naršyti skelbimus
        </router-link>
        <router-link to="/create-post" tag="button" class="input-button">
          <span class="material-icons align-middle">directions_car</span>
          Patalpinti skelbimą
        </router-link>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import "../assets/styles/variables.scss";
@import "../assets/styles/global.scss";

.item-padding {
  padding-bottom: 120px;
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
}

.section-header {
  margin-top: 80px;
}
</style>
