<script lang="ts">
import Menu from "@/components/Menu.vue"; // @ is an alias to /src
import Post from "@/components/Post.vue"; // @ is an alias to /src
import { computed } from "vue";
import { useStore } from "vuex";
import router from "@/router";

export default {
  components: {
    Menu,
    Post
  },
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  setup() {
    const { state } = useStore();
    const posts = computed(() => state.posts.posts);

    function goToDetails(id: string): void {
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
      <Post
        v-for="post in posts"
        :key="post._id"
        :post="post"
        @click="goToDetails(post._id)"
      ></Post>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.container {
  width: 70%;
  padding: 20px 20px 10px 20px;
}
</style>
