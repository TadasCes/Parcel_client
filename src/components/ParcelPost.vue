<script lang="ts">
import { computed, ref } from "vue";
import City from "../components/formComponents/City.vue";
import IPost from "@/interfaces/IPost";
import { useStore } from "vuex";
import { createPost } from "@/services/post.api.service";
import router from "@/router";

export default {
  components: {
    City
  },
  setup() {
    const cityStart = ref("");
    const cityEnd = ref("");
    const day = ref("");
    const size = ref(0);
    const timeStart = ref("");
    const timeEnd = ref("");

    const { state } = useStore();
    const user = computed(() => state.loggedUser);

    function createNewPost(): void {
      const newPost: IPost = {
        cityStart: cityStart.value,
        cityEnd: cityEnd.value,
        day: day.value,
        timeStart: timeStart.value,
        timeEnd: timeEnd.value,
        size: size.value,
        author: {
          id: user.value._id,
          firstName: user.value.firstName,
          lastName: user.value.lastName,
          phone: user.value.phone,
          rating: user.value.rating,
          countDelivered: user.value.countDelivered
        }
      };
      createPost(newPost);
      console.log(newPost);
      router.push("/home");
    }

    return {
      cityStart,
      cityEnd,
      day,
      size,
      timeStart,
      timeEnd,
      createNewPost
    };
  }
};
</script>

<template>
  <form class="form">
    <h2>Siunčiu siuntą</h2>
    <div class="form-inputs container">
      <div class="row w-50">
        <div class="col-12">
          <label for="from">Iš kur siunčiate?</label>
          <City
            name="from"
            title="Pasirinkite miestą"
            @update:city="cityStart = $event"
          />
        </div>
        <div class="col-12">
          <label for="to">Į kur siunčiate?</label>
          <City
            name="to"
            title="Pasirinkie miestą"
            @update:city="cityEnd = $event"
          />
        </div>
        <div class="time-section col-12">
          <label for="day">Pasirinkite data</label>
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
          <label for="to">Irasykite isvykimo laika</label>
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
          <label for="to">Irasykite atvykimo laika</label>
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
          <div class="search-field">
            <label for="size">Pasirinkite siuntos dydį</label>

            <!-- <span class="material-icons">aspect_ratio</span> -->
            <div class="size-select form-input" id="select-size">
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
          class="input-button input-button-secondary mr-3"
        >
          Atgal
        </router-link>
      </div>
    </div>
  </form>
</template>

<style lang="scss" scoped>
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
