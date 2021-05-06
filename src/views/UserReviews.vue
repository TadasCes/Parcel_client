<script lang="ts">
import Navigation from "@/components/Navigation.vue";
import Post from "@/components/Post.vue";
import SearchBar from "@/components/SearchBar.vue";
import ReviewPost from "@/components/ReviewPost.vue";
import {
  computed,
  onBeforeMount,
  onDeactivated,
  onMounted,
  onUnmounted,
  ref
} from "vue";
import { useStore } from "vuex";
import router from "@/router";
import { getAllUserReviews } from "@/services/user.api.service";

export default {
  components: {
    Navigation,
    ReviewPost
  },
  props: {
    postId: {
      type: String,
      required: true
    },
    id: {
      type: String,
      required: true
    },
    userName: {
      type: String,
      required: true
    }
  },
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  setup(props: any) {
    const reviewList = ref([]);
    const isLoading = ref(true);

    onBeforeMount(async () => {
      await getAllUserReviews(props.id).then(result => {
        reviewList.value = result.data.result;
        isLoading.value = false;
      });
    });

    function backToPost() {
      router.push({
        name: "Details",
        params: {
          id: props.postId
        }
      });
    }

    return { isLoading, reviewList, backToPost };
  }
};
</script>

<template>
  <div class="home">
    <div class="search-section">
      <Navigation></Navigation>
    </div>
    <div class="container" v-if="isLoading == false">
      <div class="back-link" @click="backToPost">
        <i class="fas fa-arrow-left"></i>
        <span>Grįžti</span>
      </div>
      <ul class="post">
        <h2>Atsiliepimai apie {{ userName }}</h2>
        <hr class="mb-3" />
        <ReviewPost
          v-for="review in reviewList"
          :key="review._id"
          :review="review"
        ></ReviewPost>
      </ul>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import "../assets/styles/global";

.post {
  margin-top: 45px;
}

h2 {
  margin-bottom: 20px;
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
