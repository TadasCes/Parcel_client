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
    }
  },
  components: {
    Navigation
  },
  setup(props: any) {
    const store = useStore();
    const user = computed(() => store.state.loggedUser);
    let post: IPost;
    const isAuth = isAuthenticated();
    const isAuthorLoggedNow = ref(false);
    const reviewCount = ref(0);
    const now = moment().toDate();
    const type = ref(0);

    function isEndTimeHasPassed() {
      const myDate = moment(post.day, "YYYY-MM-DD").toDate();
      const isPassed = moment(now).isAfter(myDate);
      console.log(moment(now).isAfter(myDate));
      return isPassed;
    }

    function getAPost() {
      post = store.getters["posts/getAPost"](props.id);
      const dayFormated = moment(post.timeStart).format("YYYY-MM-DD");
      const timeStartFormated = moment(post.timeStart).format("HH:mm");
      const timeEndFormated = moment(post.timeEnd).format("HH:mm");
      post.day = dayFormated;
      post.timeStart = timeStartFormated;
      post.timeEnd = timeEndFormated;
      store.dispatch("posts/savePostInMemory", post);
      if (post.author.id === user.value._id) {
        isAuthorLoggedNow.value = true;
      }
      type.value = post.type;
      console.log(post);
      isEndTimeHasPassed();
    }

    function leaveAReview() {
      const authorId = post.author.id;
      const firstName = post.author.firstName;
      const lastName = post.author.lastName;
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

    onBeforeMount(() => {
      getAPost();
    });

    return {
      post: computed(() => post),
      contactAuthor,
      leaveAReview,
      reviewCount,
      isAuth,
      deletePost,
      isAuthorLoggedNow,
      isEndTimeHasPassed,
      tripEnded,
      parcelDelivered,
      type
    };
  }
};
</script>

<template>
  <div id="edit-post" class="">
    <Navigation />
    <div class="container">
      <div v-if="isAuthorLoggedNow === true">
        <h2 class="top-header">Jūsų skelbimo detalės</h2>
      </div>
      <div v-else>
        <h2 class="top-header">Skelbimo detalės</h2>
      </div>
      <div class="container">
        <div class="row">
          <div class="col-6 content">
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
          <div class="col-6 content">
            <div v-if="isAuthorLoggedNow == true">
              <h3>Pasirinkimai</h3>
            </div>
            <div v-if="isAuthorLoggedNow == false">
              <h3>Įrašo autorius</h3>
              <h5>
                Vardas:
                {{ post.author.firstName }}
                {{ post.author.lastName }}
              </h5>
              <div v-if="post.author.rating == 0">
                <h5>Nėra įvertinimų</h5>
              </div>
              <div v-else>
                <h5>Įvertinimas: {{ post.author.rating }}</h5>
              </div>
              <h6>Pervežta siuntų: {{ post.author.tripCount }}</h6>
              <h6>Išsiųsta siuntų: {{ post.author.sentCount }}</h6>
            </div>
            <div>
              <div v-if="isAuthorLoggedNow == false">
                <div v-if="isAuth == true">
                  <button class="input-button" @click="leaveAReview()">
                    Palikti atsiliepimą
                  </button>
                </div>
              </div>
              <div v-if="isAuthorLoggedNow == true">
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
        <div class="row">
          <div class="col-6 content">
            <h3>Laikas</h3>
            <div>
              <h5>Pradžia: {{ post.day }} {{ post.timeStart }}</h5>
              <h5>Pabaiga: {{ post.day }} {{ post.timeEnd }}</h5>
            </div>
          </div>
        </div>
        <div class="row ">
          <div class="buttons">
            <div v-if="isAuthorLoggedNow === false">
              <input
                type="submit"
                value="Susisiekti"
                class="input-button mr-3"
                @click="contactAuthor"
              />
            </div>
            <router-link
              to="/home"
              tag="button"
              class="input-button input-button-secondary mr-3"
            >
              Atgal
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
h2 {
  margin-bottom: 30px;
}
.input-button {
  float: none !important;
}

.buttons {
  display: flex;
  margin: 0 auto;
}
.btn-box {
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
