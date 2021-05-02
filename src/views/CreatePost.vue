<script lang="ts">
import City from "../components/formComponents/City.vue";
import { useStore } from "vuex";
import { computed, ref } from "vue";
import { createPost } from "../services/post.api.service";
import router from "@/router";
import IPost from "@/interfaces/IPost";
import Navigation from "@/components/Navigation.vue";
import ParcelPost from "@/components/ParcelPost.vue";
import TravelPost from "@/components/TravelPost.vue";
export default {
  components: {
    Navigation,
    City
  },
  setup() {
    const { state } = useStore();
    const user = computed(() => state.loggedUser);

    const cityStart = ref("");
    const cityEnd = ref("");
    const day = ref("");
    const timeStart = ref("");
    const timeEnd = ref("");
    const size = ref(0);
    const show = ref(true);
    const template = ref("");
    const comment = ref("");
    const type = ref(0);
    function loadParcel() {
      show.value = false;
      template.value = "parcel";
      type.value = 1;
    }

    function loadTravel() {
      show.value = false;
      template.value = "travel";
      type.value = 2;
    }

    function createNewPost(): void {
      if (
        cityStart.value != "" &&
        cityEnd.value != "" &&
        day.value != "" &&
        timeStart.value != "" &&
        timeEnd.value != "" &&
        size.value != 0
      ) {
        console.log(user.value);
        const newPost: IPost = {
          type: type.value,
          cityStart: cityStart.value,
          cityEnd: cityEnd.value,
          day: day.value,
          timeStart: timeStart.value,
          timeEnd: timeEnd.value,
          comment: comment.value,
          author: {
            id: user.value._id,
            firstName: user.value.firstName,
            lastName: user.value.lastName,
            rating: user.value.rating,
            phone: user.value.phone,
            tripCount: user.value.tripCount,
            sentCount: user.value.sentCount
          }
        };
        createPost(newPost);
        console.log(newPost);
        alert("Skelbimas sukurtas!");
        router.push("/home");
      } else {
        alert("Užpildykite visus laukelius");
      }
    }

    return {
      cityStart,
      cityEnd,
      day,
      timeStart,
      timeEnd,
      comment,
      loadParcel,
      loadTravel,
      show,
      size,
      template,
      createNewPost
    };
  },
  methods: {}
};
</script>

<template>
  <div id="create-post" class="">
    <Navigation />

    <div :class="show === true ? 'show' : 'hide'">
      <h1>Pasirinkite skelbimo tipą</h1>
      <button id="parcel" class="input-button" @click="loadParcel">
        <span class="material-icons align-middle mr-1">
          mail
        </span>
        Siunčiu
      </button>
      <button id="travel" class="input-button" @click="loadTravel">
        <span class="material-icons align-middle mr-1">directions_car</span>
        Keliauju
      </button>
    </div>
    <div v-if="show === false" class="container form">
      <div v-if="template === 'travel'">
        <h2>Keliauju tarp miestų</h2>
      </div>
      <div v-else>
        <h2>Siunčiu siuntą</h2>
      </div>

      <div class="row w-50">
        <div class="col-12">
          <div class="form-input">
            <div v-if="template === 'travel'">
              <label for="from">Iš kur keliaujate?</label>
            </div>
            <div v-else>
              <label for="from">Iš kur siunčiate?</label>
            </div>
            <City
              name="from"
              title="Pasirinkite miestą"
              @update:city="cityStart = $event"
            />
            <span class="focus-border"></span>
          </div>
        </div>
        <div class="col-12">
          <div class="form-input">
            <div v-if="template === 'travel'">
              <label for="from">Į kur keliaujate?</label>
            </div>
            <div v-else>
              <label for="from">Į kur siunčiate?</label>
            </div>
            <City
              name="to"
              title="Pasirinkie miestą"
              @update:city="cityEnd = $event"
            />
            <span class="focus-border"></span>
          </div>
        </div>
        <div class="time-section col-12">
          <label for="day">Pasirinkite dieną</label>
          <div class="form-input ">
            <input
              v-model="day"
              type="date"
              placeholder="Day"
              class="input-field-global input-field"
              name="Day"
            />
            <span class="focus-border"></span>
          </div>
        </div>
        <div class="form-input col-12">
          <div v-if="template === 'travel'">
            <label for="from">Pasirinkite kelionės pradžios laiką</label>
          </div>
          <div v-else>
            <label for="from">Nuo kada galite perduoti siuntą?</label>
          </div>
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
          <div v-if="template === 'travel'">
            <label for="from">Pasirinkite kelionės pabaigos laiką</label>
          </div>
          <div v-else>
            <label for="from">Iki kada galite perduoti siuntą?</label>
          </div>
          <input
            v-model="timeEnd"
            type="time"
            placeholder="Time end"
            class="input-field-global input-field "
            name="End"
          />
          <span class="focus-border"></span>
        </div>
        <div class="form-field col-12">
          <div class="search-field form-field">
            <div v-if="template === 'travel'">
              <label for="size">Kokio dydžio siuntą galite gabenti?</label>
            </div>
            <div v-else>
              <label for="size">Kokio dydžio siuntą siunčiate?</label>
            </div>
            <!-- <span class="material-icons">aspect_ratio</span> -->
            <div class="size-select form-input" id="select-size">
              <select
                v-model="size"
                name="size"
                class="input-field input-select input-size"
                title="Siuntos dydis"
              >
                <option selected disabled :value="0">Dydis</option>
                <option :value="1">Maža: ~9x38x64cm</option>
                <option :value="2">Vidutinė: ~19x38x64cm</option>
                <option :value="3">Didelė: ~39x38x64cm</option>
              </select>
              <span class="focus-border"></span>
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
                cols="62"
                rows="3"
                maxlength="300"
              ></textarea>
            </div>
          </div>
        </div>
      </div>

      <div class="d-flex">
        <input
          type="submit"
          value="Paskelbti"
          class="input-button mr-3"
          @click="createNewPost"
        />
        <router-link
          to="/home"
          tag="button"
          class="input-button input-button-secondary"
        >
          Atšaukti
        </router-link>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
button {
  margin: 10px;
}

.show {
  padding-top: 200px;
}

.hide {
  display: none;
}
#comment {
  border: 1px solid #ccc !important;
  border-radius: 10px;
  transition: 0.08s;
}

#comment:focus {
  border-radius: 0px;
  outline: 2.5px solid #3399ff !important;
  transition: 0.08s;
}

h2 {
  padding-bottom: 60px;
  padding-top: 30px;
}

form {
  padding-top: 20px;
}
.col-12 {
  margin-bottom: 50px;
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
}
</style>
