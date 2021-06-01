<script lang="ts">
import City from "../components/formComponents/City.vue";
import { useStore } from "vuex";
import { computed, onMounted, ref } from "vue";
import { updatePost } from "../services/post.api.service";
import router from "@/router";
import moment from "moment";
import Navigation from "../components/Navigation.vue";

export default {
  components: {
    City,
    Navigation
  },
  props: {
    id: {
      type: String,
      default: ""
    }
  },
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  setup(props: { id: string }) {
    const store = useStore();
    const user = computed(() => store.state.loggedUser);

    const cityStart = ref("");
    const cityEnd = ref("");
    const day = ref("");
    const timeStart = ref("");
    const timeEnd = ref("");
    const size = ref(0);
    const start = ref("");
    const end = ref("");
    const comment = ref("");
    const authorId = ref("");
    const canChange = ref(false);
    const urgent = ref(false);
    const fragile = ref(false);
    const animal = ref(false);
    const isActive = ref(true);

    function getAPost(): void {
      const post = store.getters["posts/getAPost"](props.id);
      const dayFormated = moment(post.timeStart).format("YYYY-MM-DD");
      const timeStartFormated = moment(post.timeStart).format("HH:mm");
      const timeEndFormated = moment(post.timeEnd).format("HH:mm");
      cityStart.value = post.cityStart;
      cityEnd.value = post.cityEnd;
      day.value = dayFormated;
      timeStart.value = timeStartFormated;
      timeEnd.value = timeEndFormated;
      size.value = post.size;
      authorId.value = post.authorId;
      canChange.value = post.canChange;
      urgent.value = post.urgent;
      fragile.value = post.fragile;
      animal.value = post.animal;
      isActive.value = post.isActive;
    }

    function updateAPost(): void {
      const editedPost: any = {
        cityStart: start.value,
        cityEnd: end.value,
        day: day.value,
        timeStart: timeStart.value,
        timeEnd: timeEnd.value,
        comment: comment.value,
        size: size.value,
        authorId: user.value._id,
        isActive: true,
        seenCount: 0,
        canChange: canChange.value,
        urgent: urgent.value,
        fragile: fragile.value,
        animal: animal.value
      };
      console.log(editedPost);
      updatePost(editedPost, props.id);
      alert("Įrašas atnaujintas!");
      router.push("/home");
    }

    onMounted(() => {
      getAPost();
    });

    return {
      cityStart,
      cityEnd,
      start,
      end,
      day,
      timeStart,
      comment,
      timeEnd,
      size,
      updateAPost
    };
  }
};
</script>

<template>
  <div id="edit-post" class="">
    <Navigation />
    <div class="item-padding">
      <h2>Koreguoti įrašą</h2>
      <hr />
      <form class="form">
        <div class="form-inputs container">
          <div class="row w-50">
            <div class="col-12">
              <label for="from">Keliauju iš:</label>
              <City
                :title="cityStart"
                name="from"
                @update:city="start = $event"
              />
            </div>
            <div class="col-12">
              <label for="to">Keliauju į:</label>
              <City :title="cityEnd" name="to" @update:city="end = $event" />
            </div>
            <div class="form-input col-12 ">
              <label for="to">Kelionės diena:</label>
              <input
                v-model="day"
                type="date"
                placeholder="Day"
                class="input-field-global input-field"
                name="Day"
              />
              <span class="focus-border"></span>
            </div>
            <div class="form-input col-12 ">
              <label for="to">Planuoju išvykti:</label>
              <input
                v-model="timeStart"
                type="time"
                placeholder="Time start"
                class="input-field-global input-field"
                name="Start"
              />
              <span class="focus-border"></span>
            </div>
            <div class="form-input col-12">
              <label for="to">Planuoju atvykti:</label>
              <input
                v-model="timeEnd"
                type="time"
                placeholder="Time end"
                class="input-field-global input-field "
                name="End"
              />
              <span class="focus-border"></span>
            </div>
            <div v-if="size > 0" class="col-12">
              <div class="search-field">
                <label for="size">Galiu gabenti tokio dydžio siuntą:</label>

                <!-- <span class="material-icons">aspect_ratio</span> -->
                <div class="form-input " id="select-size">
                  <select
                    v-model="size"
                    name="size"
                    class="input-field input-select input-size"
                    title="Siuntos dydis"
                  >
                    <option selected disabled :value="0">Dydis</option>
                    <option :value="1">Maža</option>
                    <option :value="2">Vidutinė</option>
                    <option :value="3">Didelė</option>
                  </select>
                </div>
              </div>
            </div>
            <div class="form-field col-12">
              <div class="search-field">
                <label for="size">Papildomi komentarai</label>

                <!-- <span class="material-icons">aspect_ratio</span> -->
                <div class="size-select form-input" id="select-size">
                  <textarea
                    v-model="comment"
                    name="komentaras"
                    id="comment"
                    cols="45"
                    rows="3"
                    maxlength="300"
                  ></textarea>
                </div>
              </div>
            </div>
          </div>
          <div class="d-flex">
            <button
              type="button"
              class="input-button mr-3"
              @click="updateAPost"
            >
              Paskelbti
            </button>
            <router-link
              to="/home"
              tag="button"
              class="input-button input-button-secondary mr-3"
            >
              Atgal
            </router-link>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import "../assets/styles/global.css";
@import "../assets/styles/input-styles.css";

.col-12 {
  margin-bottom: 40px;
}

label {
  float: left;
  font-weight: bold;
  font-size: 20px;
}

.form {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  margin-top: 50px;
  margin-bottom: 50px;
}
</style>
