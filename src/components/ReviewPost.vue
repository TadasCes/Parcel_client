<script lang="ts">
import moment from "moment";
import { useStore } from "vuex";
import { computed, onBeforeMount, onMounted, ref } from "vue";
import { monthToLT } from "../utility/utils";
import router from "@/router";
import IUser from "@/interfaces/IUser";
import { getPostAuthor } from "@/services/post.api.service";
import { getOneUser } from "@/services/user.api.service";
import Rating from "./Rating.vue";

export default {
  components: {
    Rating
  },
  props: {
    review: {
      type: Object,
      required: true,
      default: () => ({})
    }
  },
  setup(props: any) {
    const store = useStore();
    const user = computed(() => store.state.loggedUser);
    const showOptions = ref(false);
    const isLoading = ref(true);
    let author: IUser;
    const dataFormated = props.review.date.substring(0, 10);

    onBeforeMount(async () => {
      await getOneUser(props.review.authorId).then(result => {
        author = result;
        isLoading.value = false;
      });
    });

    return {
      isLoading,
      dataFormated,
      author: computed(() => author)
    };
  }
};
</script>

<template>
  <li>
    <div v-if="isLoading == false">
      <div class="row upper-section">
        <div class="col-6">
          <h4 class="comment-author">
            {{ author.firstName }} {{ author.lastName }}
          </h4>
        </div>
        <div class="col-6">
          <p class="comment-date">{{ dataFormated }}</p>
        </div>
      </div>

      <div class="lower-section">
        <div class="comment-rating">
          <h5>Įvertinimas: {{ review.rating }}/5</h5>
          <Rating :grade="review.rating" :maxStars="5" :smaller="true" />
        </div>
        <div class="comment-text">
          <h5>Atsiliepimas:</h5>
          <h6>{{ review.comment }}</h6>
        </div>
      </div>
    </div>
    <div v-else>
      <h2>...</h2>
    </div>
    <hr />
  </li>
</template>

<style lang="scss" scoped>
@import "../assets/styles/variables";

li {
  list-style: none;
  margin-bottom: 30px;
  padding: 0 20px 0 20px;
}

.comment-rating {
  display: flex;
  text-align: center;
  h5 {
    margin-right: 10px;
    margin-top: 4px;
  }
}

.upper-section {
  h4 {
    text-align: left;
    margin-bottom: 12px;
  }
  p {
    text-align: right;
    padding-top: 6px;
    font-size: 12px;
    color: $input-color-very-light;
  }
}

.lower-section {
  text-align: left;
  h5 {
    font-weight: bold;
    font-size: 16px;
  }
  h6 {
    font-size: 14px;
  }

  .comment-text {
    display: flex;
    text-align: center;

    h5 {
      font-weight: bold;
      margin-right: 12px;
    }

    h6 {
      padding-top: 2px;
      text-align: left;
    }
  }
}
</style>
