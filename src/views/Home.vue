<script lang="ts">
import Navigation from "@/components/Navigation.vue";
import Post from "@/components/Post.vue";
import SearchBar from "@/components/SearchBar.vue";
import {
  computed,
  onBeforeMount,
  onDeactivated,
  onMounted,
  onRenderTracked,
  onRenderTriggered,
  onUnmounted,
  ref,
  watch,
  Ref
} from "vue";
import { useStore } from "vuex";
import router from "@/router";
import { fetchAllPosts } from "@/services/post.api.service";
import moment from "moment";

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
    const pageCount = computed(() => store.state.posts.pageCount);
    const currentPage = computed(() => store.state.posts.page);
    const page = ref(1);
    const pageList: Array<any> = [];

    function nextPage() {
      store.dispatch("posts/nextPage");
      store.dispatch("posts/getCurrentPage");
    }

    function previousPage() {
      store.dispatch("posts/previousPage");
      store.dispatch("posts/getCurrentPage");
    }
    console.log(pageCount.value);

    onBeforeMount(() => {
      store.dispatch("posts/resetPage");
      store.dispatch("posts/getPosts");

      for (let i = 1; i <= pageCount.value; i++) {
        pageList.push(i);
      }

      localStorage.removeItem("postInMemory");
      localStorage.removeItem("postAuthorInMemory");
    });

    onUnmounted(() => {
      store.dispatch("posts/resetPage");
    });

    return { posts, previousPage, page, nextPage, pageList, currentPage };
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
        <i class="fas fa-arrow-left" @click="previousPage()"></i>
        <span
          v-for="page in pageList"
          :key="page"
          :class="page == currentPage ? 'current-page' : 'page-number'"
          >{{ page }}</span
        >
        <i class="fas fa-arrow-right" @click="nextPage()"></i>
      </div>
      <div v-else>
        <h3>Įrašų nėra</h3>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import "../assets/styles/variables";

.page-number {
  margin: 0 5px 0 5px;
  font-size: 20px;
}
.current-page {
  margin: 0 5px 0 5px;
  font-size: 25px;
  font-weight: bold;
  color: $primary-color;
}

i {
  margin: 10px;
}

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
