<script lang="ts">
import Navigation from "@/components/Navigation.vue";
import Post from "@/components/Post.vue";
import SearchBar from "@/components/SearchBar.vue";
import {
  computed,
  onBeforeMount,
  onDeactivated,
  onMounted,
  onUnmounted
} from "vue";
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

    onBeforeMount(() => {
      store.dispatch("posts/getAllPosts");
      console.log(posts.value[2]);
      localStorage.removeItem("postInMemory");
    });

    onUnmounted(() => {
      console.log("deactivated");
    });

    return { posts };
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
      <div v-if="posts.length > 0">
        <Post v-for="post in posts" :key="post._id" :post="post"></Post>
      </div>
      <div v-else>
        <h3>Įrašų nėra</h3>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.container {
  width: 50%;
  padding: 20px 20px 10px 20px;
}

.search-section {
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
    width: 75%;
  }
}

@media screen and (max-width: 700px) {
  .container {
    width: 100%;
  }
}
</style>
