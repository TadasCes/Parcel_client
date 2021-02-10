<script lang="ts">
import Menu from "@/components/Menu.vue"; // @ is an alias to /src
import Post from "@/components/Post.vue"; // @ is an alias to /src
import { computed } from "vue";
import { useStore } from "vuex";

export default {
  components: {
    Menu,
    Post
  },
  setup() {
    const { state } = useStore();
    const posts = computed(() => state.posts.posts);

    return { posts };
  }
};
</script>

<template>
  <div id="admin-page">
    <Menu></Menu>
    <div class="container">
      <h1>ADMIN</h1>
      <router-link to="/create-post">
        <button class="btn btn-primary">Create a new post</button>
      </router-link>

      <div>
        <Post v-for="post in posts" :key="post._id" :post="post"></Post>
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
