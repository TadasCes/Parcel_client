<script lang="ts">
import { Options, Vue } from "vue-class-component";
import Menu from "@/components/Menu.vue"; // @ is an alias to /src
import SearchBar from "@/components/SearchBar.vue"; // @ is an alias to /src
import Post from "@/components/Post.vue"; // @ is an alias to /src
import { computed, onMounted, ref, watch } from "vue";
import store from "../store/index";
import { useStore } from "vuex";
import router from "@/router";

export default {
  components: {
    Menu,
    Post
  },
  setup() {
    const { state } = useStore();
    const posts = computed(() => state.posts.posts);

    function goToDetails(id: string) {
      router.push({ name: "Details", params: { id } });
    }

    return { posts, goToDetails };
  }
};
</script>

<template>
  <div class="home">
    <Menu></Menu>
    <div class="container">
      <router-link to="/create-post">
        <button class="btn btn-primary">Create a new post</button>
      </router-link>
      <div>
        <Post
          v-for="post in posts"
          :key="post._id"
          :post="post"
          @click="goToDetails(post._id)"
        ></Post>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.container {
  width: 70%;
  padding: 20px 20px 10px 20px;
}
</style>
