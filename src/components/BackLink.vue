<template>
  <router-link :to="{ name: location, params: { id: id } }" class="back-link">
    <i class="fas fa-arrow-left"></i>
    <span>Grįžti</span>
  </router-link>
</template>

<script>
export default {
  props: {
    location: {
      type: String,
      required: true
    },
    id: {
      type: String,
      required: true
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../assets/styles/global";
</style>
