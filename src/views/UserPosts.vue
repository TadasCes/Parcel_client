<script lang="ts">
import Navigation from "@/components/Navigation.vue";
import Post from "@/components/Post.vue";
import SearchBar from "@/components/SearchBar.vue";
import { computed, onBeforeMount, Ref, ref } from "vue";
import { useStore } from "vuex";
import router from "@/router";
import IPost from "@/interfaces/IPost";
import moment from "moment";

export default {
  components: {
    Navigation,
    Post
  },
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  setup() {
    const store = useStore();
    const posts = computed(() => store.state.posts.posts);
    const activePosts: Ref<IPost[]> = ref([]);
    const archivedPosts: Ref<IPost[]> = ref([]);
    const user = computed(() => store.state.loggedUser);

    function goToDetails(id: string): void {
      router.push({ name: "Details", params: { id } });
    }

    function filterUserPosts() {
      posts.value.forEach((post: IPost) => {
        if (post.author.id == user.value._id) {
          console.log(post);
          const postDate = post.timeEnd.substring(0, 10);
          const nowDate = moment().format("YYYY-MM-DD");
          if (postDate > nowDate) {
            activePosts.value.push(post);
          } else {
            archivedPosts.value.push(post);
          }
        }
      });
    }

    onBeforeMount(() => {
      store.dispatch("posts/getAllPosts").then(() => {
        filterUserPosts();
      });
    });

    return { activePosts, archivedPosts, goToDetails };
  }
};
</script>

<template>
  <div class="user-posts">
    <Navigation />
    <div>
      <h1>Aktyvūs skelbimai</h1>
      <div class="container">
        <Post v-for="post in activePosts" :key="post._id" :post="post"></Post>
      </div>
    </div>
    <div>
      <h1>Archyvuoti skelbimai</h1>
      <div class="container">
        <Post v-for="post in archivedPosts" :key="post._id" :post="post"></Post>
      </div>
    </div>
    <router-link
      to="/profile"
      tag="button"
      class="input-button input-button-secondary mr-3"
    >
      Atgal
    </router-link>
  </div>
</template>

<style lang="scss" scoped>
@import "../assets/styles/variables";

h1 {
  padding: 40px 0 10px 0;
}

.container {
  width: 50%;
  padding: 20px 20px 10px 20px;
  position: relative;
}

.post {
  height: 150px;
  background: #fff;
  margin: 20px auto;
  box-shadow: 0px 0px 10px rgb(206, 206, 206);
  // box-shadow: 3px 5px 5px rgb(206, 206, 206);
  transition: box-shadow 0.3s ease-in-out;

  border-radius: 12px;
  padding: 16px 20px;

  .row {
    padding: 16px, 20px;
    height: 100%;
    z-index: 1;
  }

  span {
    display: block;
  }

  &:hover {
    // box-shadow: inset 1px 1px 10px 1px $secondary-color;
    box-shadow: 0px 0px 5px rgb(109, 109, 109);

    // box-shadow: 3px 5px 5px $secondary-color;
    transition: box-shadow 0.3s ease-in-out;
    // border: 2px solid $secondary-color;
    // background-color: $secondary-color;
    cursor: pointer;
  }
}

.main {
  display: flex;
  align-items: center;
  text-align: start;
  padding-right: 0px;
}

.ride-info {
  display: inline-block;
  width: 50%;
  justify-content: space-around;
  flex-direction: column;
  align-self: center;
  text-align: start;

  h5,
  h6 {
    margin: 0 0 4px 32px;
  }
}

.author-info {
  width: 50%;

  display: inline-block;
  flex-direction: column;
  align-self: center;
  text-align: end;
  padding-right: 0px;

  h5,
  h6 {
    margin: 0 12px 0 0;
  }
}

.options {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-right: 12px;
  z-index: 10;

  span {
    font-size: 16px;
    right: 12px;
    text-align: center;
  }

  button:nth-child(1) {
    margin-top: 4px;
    margin-bottom: 4px;
  }
}

.col-1 {
  align-content: center;
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
