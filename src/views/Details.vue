<script lang="ts">
import { useStore } from "vuex";
import { computed, onBeforeMount, ref } from "vue";
import Map from "../components/Map.vue";
import moment from "moment";
import Navigation from "../components/Navigation.vue";
import IPost from "@/interfaces/IPost";
import {
  increaseTrip,
  isAuthenticated,
  sendContactData,
  increaseSent
} from "../services/user.api.service";
import router from "@/router";

export default {
  props: {
    id: {
      type: String,
      default: ""
    },
    postProp: {
      type: String,
      required: false
    },
    authorProp: {
      type: String,
      required: false
    }
  },
  components: {
    Navigation
  },
  setup(props: any) {
    const store = useStore();
    const user = computed(() => store.state.loggedUser);
    let post: any = {};
    let author: any = {};

    const postInMemory: any = localStorage.getItem("postInMemory");
    const postAuthorInMemory: any = localStorage.getItem("postAuthorInMemory");

    if (postInMemory == null) {
      author = JSON.parse(props.authorProp);
      post = JSON.parse(props.postProp);
    } else if (postInMemory != null) {
      post = JSON.parse(postInMemory);
      author = JSON.parse(postAuthorInMemory);
    }

    const reviewCount = author.reviews.length;

    const isAuth = isAuthenticated();
    const isAuthorLoggedNow = ref(false);
    const now = moment().toDate();
    const type = ref(0);
    const dayFormated = moment(post.timeStart).format("YYYY-MM-DD");
    const timeStartFormated = moment(post.timeStart).format("HH:mm");
    const timeEndFormated = moment(post.timeEnd).format("HH:mm");

    if (author.id === user.value._id) {
      isAuthorLoggedNow.value = true;
    }

    // console.log(router.currentRoute.value);
    function isEndTimeHasPassed() {
      const myDate = moment(post.day, "YYYY-MM-DD").toDate();
      const isPassed = moment(now).isAfter(myDate);
      console.log(moment(now).isAfter(myDate));
      return isPassed;
    }
    isEndTimeHasPassed();

    function leaveAReview() {
      const authorId = author.id;
      const firstName = author.firstName;
      const lastName = author.lastName;
      const postId: any = post._id;
      router.push({
        name: "Review",
        params: { postId, authorId, firstName, lastName }
      });
    }

    function contactAuthor() {
      if (isAuth) {
        if (
          confirm(
            "Kontaktinius vartotojo duomenis atsiųsime paštu. \n Ar sutinkate?"
          )
        ) {
          alert(
            "Kontaktinius duomenys išsiųsti. Pasitikrinkite elektroninį paštą."
          );
          sendContactData(post, user.value.email);
        }
      } else {
        if (
          confirm(
            "Norint gauti įrašo autoriaus kontaktinius duomenis, turite prisijungti. \n Ar norite prisijungti?"
          )
        ) {
          router.push("/login");
        }
      }
    }

    function deletePost() {
      console.log(post._id);
      store.dispatch("posts/deleteAPost", post._id);
      router.push("/home");
    }

    function tripEnded() {
      console.log(user.value._id);
      increaseTrip(user.value._id);
      alert("Kelionė sėkmingai užbaigta!");
      // deletePost();
    }

    function parcelDelivered() {
      increaseSent(user.value._id);
      alert("Siunta sėkmingai nusiųsta!");
      // deletePost();
    }

    function readReviews() {
      router.push({
        name: "UserReviews",
        params: {
          postId: post._id,
          id: post.authorId,
          userName: author.firstName + " " + author.lastName
        }
      });
    }

    return {
      contactAuthor,
      leaveAReview,
      dayFormated,
      reviewCount,
      timeStartFormated,
      timeEndFormated,
      isAuth,
      deletePost,
      isAuthorLoggedNow,
      isEndTimeHasPassed,
      tripEnded,
      parcelDelivered,
      type,
      post,
      readReviews,
      author
    };
  }
};
</script>

<template>
  <div id="edit-post" class="">
    <Navigation />
    <div class="container">
      <router-link class="back-link" to="/home">
        <i class="fas fa-arrow-left"></i>
        <span>Grįžti</span>
      </router-link>
      <div>
        <div v-if="isAuthorLoggedNow === true">
          <h2 class="top-header">Jūsų skelbimo detalės</h2>
        </div>
        <div v-else>
          <h2 class="top-header">Skelbimo detalės</h2>
        </div>
        <div class="row">
          <div class="col-7 item-padding">
            <div class="content ">
              <h3>Planuojamas maršrutas</h3>
              <div>
                <h5>
                  Pradžia: <strong>{{ post.cityStart }}</strong>
                </h5>
                <h5>
                  Pabaiga: <strong>{{ post.cityEnd }}</strong>
                </h5>
              </div>
            </div>
            <div class="content">
              <h3>Laikas</h3>
              <div>
                <h5>Pradžia: {{ dayFormated }} {{ timeStartFormated }}</h5>
                <h5>Pabaiga: {{ dayFormated }} {{ timeEndFormated }}</h5>
              </div>
            </div>
          </div>
          <div class="col-1"></div>
          <div class="col-4 item-padding">
            <div class=" content ">
              <div v-if="isAuthorLoggedNow == false">
                <div v-if="type == 1">
                  <p class="korteles-header">Siunčia</p>
                </div>
                <div v-else>
                  <p class="korteles-header">Keliauja</p>
                </div>
                <h5 class="name">
                  {{ author.firstName }}
                  {{ author.lastName }}
                </h5>
                <div v-if="author.rating == 0">
                  <h5>Nėra įvertinimų</h5>
                </div>
                <div v-else class="text-apart">
                  <h6>Įvertinimas:</h6>
                  <h6>{{ author.rating }}/5</h6>
                </div>
                <div class="text-apart mb-3">
                  <h6>Atsiliepimai</h6>
                  <h6>{{ reviewCount }}</h6>
                </div>
                <div class="text-apart">
                  <h6>Pervežta siuntų:</h6>
                  <h6>{{ author.tripCount }}</h6>
                </div>
                <div class="text-apart">
                  <h6>Išsiųsta siuntų:</h6>
                  <h6>{{ author.sentCount }}</h6>
                </div>
              </div>
              <div>
                <div v-if="isAuthorLoggedNow == false">
                  <div v-if="isAuth == true" class="buttons">
                    <button class="input-button" @click="contactAuthor">
                      Susisiekti
                    </button>
                    <button class="input-button" @click="leaveAReview()">
                      Palikti atsiliepimą
                    </button>
                    <button class="input-button" @click="readReviews()">
                      Peržiūrėti atsiliepimus
                    </button>
                  </div>
                </div>
                <div v-if="isAuthorLoggedNow == true" class="buttons">
                  <div v-if="type == 1">
                    <div v-if="isEndTimeHasPassed() == true">
                      <button class="input-button" @click="parcelDelivered()">
                        Siunta nusiųsta
                      </button>
                    </div>
                  </div>
                  <div v-if="type == 2">
                    <div v-if="isEndTimeHasPassed() == true">
                      <button class="input-button" @click="tripEnded()">
                        Kelionė baigta
                      </button>
                    </div>
                  </div>
                  <button class="input-button" @click="deletePost()">
                    Pašalinti įrašą
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import "../assets/styles/global";

.container {
  width: 75%;
  margin-top: 40px;
}

h2 {
  margin-bottom: 30px;
}
.input-button {
  float: none !important;
}

.name {
  font-size: 22px;
  padding-bottom: 5px;
}

.btn-box {
  display: flex;
  margin: 0 auto;
}

#create-post {
  padding-top: 60px;
}

.buttons {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  margin-top: 40px;
}
</style>
