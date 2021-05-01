<script lang="ts">
import { useStore } from "vuex";
import { computed, onBeforeMount, ref } from "vue";
import Map from "../components/Map.vue";
import moment from "moment";
import Navigation from "../components/Navigation.vue";
import IPost from "@/interfaces/IPost";
import {
  getOneUser,
  sendContactData,
  leaveReview
} from "../services/user.api.service";
import IUser from "@/interfaces/IUser";
import StarRating from "vue-star-rating";
import Rating from "../components/Rating.vue";
import router from "@/router";

export default {
  props: {
    postId: {
      type: String,
      default: ""
    },
    authorId: {
      type: String,
      default: ""
    },
    firstName: {
      type: String,
      default: ""
    },
    lastName: {
      type: String,
      default: ""
    }
  },
  components: {
    StarRating,
    Navigation
  },
  setup(props: any) {
    const store = useStore();
    const user = computed(() => store.state.loggedUser);
    const firstNameValue = props.firstName;
    const lastNameValue = props.lastName;
    const comment = ref("");
    const rating = ref(0);
    let author: IUser;
    const now = moment().toDate();

    function leaveAReview() {
      const review = {
        targetId: props.authorId,
        authorId: user.value._id,
        comment: comment.value,
        rating: rating.value,
        date: now
      };
      console.log(review);
    }

    function goBackToPost() {
      router.push({ name: "Details", params: { id: props.postId } });
    }
    return {
      author: computed(() => author),
      firstNameValue,
      lastNameValue,
      leaveAReview,
      goBackToPost
    };
  }
};
</script>

<template>
  <div id="edit-post" class="">
    <Navigation />
    <div class="top-header">
      <h3>
        Paliktie atsiliepimą apie {{ firstNameValue }} {{ lastNameValue }}
      </h3>
    </div>
    <div class="container review-box">
      <div>
        <h4 class="ivertinimas">Įvertinimas:</h4>
        <StarRating></StarRating>
        <h4 class="komentaras">Komentaras:</h4>
        <textarea name="" id="" cols="55" rows="10"></textarea>
      </div>
      <div class="d-flex mt-4">
        <input
          type="submit"
          value="Palikti atsiliepimą"
          class="input-button mr-3"
          @click.prevent="leaveAReview"
        />
        <button
          class="input-button input-button-secondary mr-3"
          @click="goBackToPost"
        >
          Atgal
        </button>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.input-button {
  float: none !important;
}

.review-box {
  width: 75%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  h4 {
    text-align: left;
    margin-top: 30px;
  }

  .ivertinimas {
    margin-bottom: 20px;
  }
}

.buttons {
  display: flex;
  margin: 0 auto;
}

#create-post {
  padding-top: 60px;
}

.content {
  height: 200px;
  padding: 0 24px 24px 0;
}

.row {
  margin-bottom: 36px;
}

.input-button {
  float: left;
}

.form {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
}

.time-section {
  display: flex;
  flex-direction: column;

  .form-input {
    margin-bottom: 44px;
  }
}
</style>

function onBeforeMounted(arg0: () => void) { throw new Error('Function not
implemented.'); }
