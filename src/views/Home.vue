<script lang="ts">
import Navigation from "@/components/Navigation.vue";
import Post from "@/components/Post.vue";
import SearchBar from "@/components/SearchBar.vue";
import { computed, onBeforeMount } from "vue";
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
    const store = useStore();
    const posts = computed(() => store.state.posts.posts);
    console.log(posts.value);
    function goToDetails(id: string): void {
      router.push({ name: "Details", params: { id } });
    }

    onBeforeMount(() => {
      store.dispatch("posts/getAllPosts");
    });

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
  top: 225px;
  position: relative;
}

.search-section {
  position: fixed;
  width: 100%;
  background-color: white;
  z-index: 100;
  box-shadow: 1px 5px 10px rgb(185, 185, 185);
}

@media screen and (max-width: 1300px) {
  .container {
    width: 65%;
  }
}

@media screen and (max-width: 1000px) {
  .container {
    top: 270px;
    width: 75%;
  }
}

@media screen and (max-width: 700px) {
  .container {
    top: 340px;
    width: 100%;
  }
}
</style>
