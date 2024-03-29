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
import { deactivatePost } from "@/services/post.api.service";

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
    console.log(post);
    const reviewCount = author.reviews.length;

    const isAuth = isAuthenticated();
    const isAuthorLoggedNow = ref(false);
    const now = moment().toDate();
    const type = ref(0);
    const dayFormated = moment(post.timeStart).format("YYYY-MM-DD");
    const timeStartFormated = moment(post.timeStart).format("HH:mm");
    const timeEndFormated = moment(post.timeEnd).format("HH:mm");

    if (author._id === user.value._id) {
      isAuthorLoggedNow.value = true;
    }

    function isEndTimeHasPassed() {
      const myDate = moment(post.timeStart).format("YYYY-MM-DD");
      const isPassed = moment(now, "YYYY-MM-DD").isAfter(myDate);
      return isPassed;
    }
    isEndTimeHasPassed();

    function leaveAReview() {
      const authorId = author._id;
      const firstName = author.firstName;
      const lastName = author.lastName;
      const postId: any = post._id;
      console.log(authorId);
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
      deactivatePost(props.id);
      store.dispatch("posts/getPosts");
      store.dispatch("posts/setPages");
      router.push("/home");
    }
    function editPost() {
      router.push({ name: "EditPost", params: { id: post._id } });
    }

    function parcelDelivered() {
      increaseSent(user.value._id);
      alert("Siunta sėkmingai nusiųsta!");
      deactivatePost(props.id);

      router.push("/home");
    }

    function allUserPosts() {
      router.push("");
    }

    function deactivateAPost() {
      store.dispatch("posts/deactivateAPost", post._id);
      console.log(post);
      alert("Įrašas deaktyvuotas");
      router.push("/home");
    }

    function activatePost() {
      store.dispatch("posts/activateAPost", post._id);
      console.log(post);
      alert("Įrašas aktyvuotas iš naujo");
      router.push("/home");
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
      activatePost,
      timeStartFormated,
      timeEndFormated,
      editPost,
      allUserPosts,
      isAuth,
      deletePost,
      isAuthorLoggedNow,
      isEndTimeHasPassed,
      tripEnded,
      deactivateAPost,
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
      <div class="row">
        <router-link class="back-link" to="/home">
          <i class="fas fa-arrow-left"></i>
          <span>Grįžti</span>
        </router-link>
      </div>
      <div>
        <div class="row">
          <div class="col-xl-7 col-lg-12 item-padding route-details">
            <div class=" ">
              <div class="korteles-header">
                <div v-if="isAuthorLoggedNow === true">
                  <h2 class="korteles-header">Jūsų skelbimo detalės</h2>
                  <hr />
                </div>
                <div v-else>
                  <h2 class="korteles-header">Skelbimo detalės</h2>
                  <hr />
                </div>
              </div>
              <div class="row">
                <div class="col-lg-7">
                  <div v-if="post.type == 1">
                    <h4 class="mb-3">Siunčiama</h4>
                  </div>
                  <div v-else>
                    <h4 class="mb-3">Keliaujama</h4>
                  </div>
                  <div class="route-section font-rubik">
                    <div class="text-apart">
                      <span>Iš:</span>
                      <span>{{ post.cityStart }}</span>
                    </div>
                    <div class="text-apart">
                      <span>Į:</span>
                      <span>{{ post.cityEnd }}</span>
                    </div>
                  </div>
                </div>
                <div class="col-lg-5">
                  <h4>Papiloma info:</h4>
                  <div v-if="post.type == 1">
                    <div>
                      <div v-if="post.size == 1">
                        <span>Maža siunta</span>
                      </div>
                      <div v-if="post.size == 2">
                        <span>Vidutinė siunta</span>
                      </div>
                      <div v-if="post.size == 3">
                        <span>Didelė siunta</span>
                      </div>
                    </div>
                    <div v-if="post.urgent == true">
                      <span>Skubi siunta</span>
                    </div>
                    <div v-if="post.fragile == true">
                      <span>Dūžtanti siunta</span>
                    </div>
                    <div v-if="post.animal == true">
                      <span>Gyvūnas</span>
                    </div>
                    <div v-else>
                      <span>Paprastas siuntinys</span>
                    </div>
                  </div>
                  <div v-if="post.type == 2">
                    <div v-if="post.canChange == true">
                      <span>Galima koreguoti maršrutą</span>
                    </div>
                    <div>
                      <div v-if="post.size == 1">
                        <span>Mažai vietos siuntoms</span>
                      </div>
                      <div v-if="post.size == 2">
                        <span>Vidutinškai vietos siuntoms</span>
                      </div>
                      <div v-if="post.size == 3">
                        <span>Daug vietos siuntoms</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="row pb-5"></div>
            <div class="row">
              <div class="col-lg-7">
                <h4 class="">Laikas</h4>
                <div class="font-rubik">
                  <div class="route-section">
                    <div class="text-apart">
                      <span>Nuo:</span>
                      <span>{{ dayFormated }} {{ timeStartFormated }}</span>
                    </div>
                    <div class="text-apart">
                      <span>Iki:</span>
                      <span>{{ dayFormated }} {{ timeEndFormated }}</span>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-lg-5">
                <h4 class="">Komentaras</h4>
                <div class="font-rubik">
                  <div v-if="post.comment != ''">
                    <span>{{ post.comment }}</span>
                  </div>
                  <div v-else>
                    <span>Nėra</span>
                  </div>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-12 mx-auto perziuros">
                Peržiūrų skaičius: {{ post.seenCount }}
              </div>
            </div>
          </div>
          <div class="col-1"></div>
          <div class="col-xl-4 col-lg-12 item-padding">
            <div class=" content ">
              <div v-if="isAuthorLoggedNow == false">
                <div v-if="post.type == 1">
                  <span class="korteles-header">Siunčia</span>
                  <hr />
                </div>
                <div v-else>
                  <span class="korteles-header">Keliauja</span>
                  <hr />
                </div>
                <h3 class="name">
                  {{ author.firstName }}
                  {{ author.lastName }}
                </h3>
                <div v-if="author.rating == 0">
                  <span>Nėra įvertinimų</span>
                </div>
                <div v-else class="text-apart">
                  <span>Įvertinimas:</span>
                  <span>{{ author.rating }}/5</span>
                </div>
                <div class="text-apart mb-3">
                  <span>Atsiliepimai</span>
                  <span>{{ reviewCount }}</span>
                </div>
                <div class="text-apart">
                  <span>Pervežta siuntų:</span>
                  <span>{{ author.tripCount }}</span>
                </div>
                <div class="text-apart">
                  <span>Išsiųsta siuntų:</span>
                  <span>{{ author.sentCount }}</span>
                </div>
              </div>
              <div class="mt-3">
                <div v-if="isAuthorLoggedNow == false">
                  <div v-if="isEndTimeHasPassed() === false">
                    <button class="input-button" @click="contactAuthor">
                      Susisiekti
                    </button>
                  </div>
                </div>
                <div v-if="isAuthorLoggedNow == false">
                  <div v-if="isAuth == true" class="buttons">
                    <button class="input-button" @click="leaveAReview()">
                      Palikti atsiliepimą
                    </button>
                  </div>
                  <button class="input-button" @click="readReviews()">
                    Peržiūrėti atsiliepimus
                  </button>
                </div>
                <div v-if="isAuthorLoggedNow == true" class="buttons btns-auth">
                  <div v-if="post.isActive == true">
                    <button class="input-button" @click="deactivateAPost()">
                      Deaktyvuoti įrašą
                    </button>
                  </div>
                  <div v-else>
                    <button class="input-button" @click="activatePost()">
                      Aktyvuoti įrašą
                    </button>
                  </div>
                  <div v-if="isEndTimeHasPassed() === true">
                    <div v-if="post.type == 1">
                      <button class="input-button" @click="parcelDelivered()">
                        Siunta nusiųsta
                      </button>
                    </div>
                    <div v-if="post.type == 2">
                      <button class="input-button" @click="tripEnded()">
                        Kelionė baigta
                      </button>
                    </div>
                  </div>
                  <button class="input-button" @click="editPost()">
                    Redaguoti įrašą
                  </button>
                  <button class="input-button" @click="deletePost()">
                    Pašalinti įrašą
                  </button>
                </div>
                <!-- <div>
                  <button class="input-button" @click="allUserPosts()">
                    Peržiūrėti visus vartotojo įrašus
                  </button>
                </div> -->
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

.route-details {
  display: flex;
  flex-direction: column;
}

.btns-auth {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.back-link {
  padding-top: 8px;
}

.route-section {
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 90%;
  margin: 0 auto;
}

.container {
  width: 75%;
  margin-top: 40px;
}

.perziuros {
  margin-top: 30px;
}

.time-section {
  margin-top: 50px;
  padding-bottom: 100px;
}

.input-button {
  float: none !important;
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
