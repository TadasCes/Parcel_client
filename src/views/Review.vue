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
    Rating,
    Navigation
  },
  setup(props: any) {
    const store = useStore();
    const user = computed(() => store.state.loggedUser);
    const firstNameValue = props.firstName;
    const lastNameValue = props.lastName;
    const comment = ref("");
    const rating = ref(5);
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
      leaveReview(review, props.authorId);
      alert("Įvertinimas išsaugotas!");
      router.push("/home");
    }

    function onRatingUpdate(value) {
      rating.value = value;
    }

    function goBackToPost() {
      router.push({ name: "Details", params: { id: props.postId } });
    }
    return {
      author: computed(() => author),
      firstNameValue,
      lastNameValue,
      leaveAReview,
      goBackToPost,
      rating,
      onRatingUpdate,
      comment
    };
  }
};
//          @update:rating="rating = $event"
</script>

<template>
  <div id="edit-post" class="">
    <Navigation />
    <div class="item-padding">
      <div class="top-header">
        <h2>
          Palikite atsiliepimą apie {{ firstNameValue }} {{ lastNameValue }}
        </h2>
        <hr />
      </div>
      <div class="container review-box font-rubik">
        <div>
          <h4 class="ivertinimas">Įvertinimas:</h4>
          <Rating
            :grade="5"
            :maxStars="5"
            :hasCounter="true"
            @update="onRatingUpdate($event)"
          />
          <h4 class="komentaras mt-4">Komentaras:</h4>
          <textarea
            name=""
            id=""
            cols="55"
            rows="10"
            v-model="comment"
          ></textarea>
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
  </div>
</template>

<style lang="scss" scoped>
.item-padding {
  margin-top: 60px;
}

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
