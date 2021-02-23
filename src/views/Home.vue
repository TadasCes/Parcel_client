<script lang="ts">
import Navigation from "@/components/Navigation.vue";
import Post from "@/components/Post.vue";
import SearchBar from "@/components/SearchBar.vue";
import { computed } from "vue";
import { useStore } from "vuex";
import router from "@/router";

export default {
  components: {
    Navigation,
    Post,
    SearchBar
  },
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  setup() {
    const { state } = useStore();
    const posts = computed(() => state.posts.posts);
    console.log(posts.value);
    function goToDetails(id: string): void {
      router.push({ name: "Details", params: { id } });
    }

    return { posts, goToDetails };
  }
};
</script>

<template>
  <div class="home">
    <div class="search-section">
      <Navigation></Navigation>
      <SearchBar />
    </div>
    <div class="container">
      <Post v-for="post in posts" :key="post._id" :post="post"></Post>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.container {
  width: 50%;
  padding: 20px 20px 10px 20px;
  top: 250px;
  position: relative;
}

.search-section {
  position: fixed;
  width: 100%;
  background-color: white;
  z-index: 100;
  box-shadow: 1px 5px 10px rgb(185, 185, 185);
}

@media screen and (max-width: 900px) {
  .container {
    width: 75%;
  }
}

@media screen and (max-width: 580px) {
  .container {
    width: 100%;
  }
}
</style>
