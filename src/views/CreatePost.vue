<script lang="ts">
import City from "../components/formComponents/City.vue";
import { useStore } from "vuex";
import { computed, ref } from "vue";
import { createPost } from "../services/post.api.service";
import router from "@/router";
import IPost from "@/interfaces/IPost";
export default {
  components: {
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

    function createNewPost(): void {
      const newPost: IPost = {
        cityStart: cityStart.value,
        cityEnd: cityEnd.value,
        day: day.value,
        timeStart: timeStart.value,
        timeEnd: timeEnd.value,
        author: {
          id: user.value._id,
          firstName: user.value.firstName,
          lastName: user.value.lastName,
          rating: user.value.rating,
          countDelivered: user.value.countDelivered
        }
      };
      createPost(newPost);
      console.log(newPost);
      router.push("/home");
    }
    return { cityStart, cityEnd, day, timeStart, timeEnd, createNewPost };
  },
  methods: {}
};
</script>

<template>
  <div id="create-post" class="">
    <router-link to="/home" tag="button" class="input-button secondary-color">
      Back
    </router-link>
    <div class="row">
      <div class="col-12">
        <h2>Create a New Post</h2>
      </div>
    </div>
    <form class="form">
      <div class="form-inputs container">
        <div class="row w-50">
          <div class="col-lg-6 col-md-12">
            <City
              name="from"
              title="Iš kur?"
              @update:city="cityStart = $event"
            />
          </div>
          <div class="col-lg-6 col-md-12">
            <City name="to" title="Į kur?" @update:city="cityEnd = $event" />
          </div>
        </div>
        <div class="row time-section">
          <label for="to">Pasirinkite data</label>
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
          <div class="form-input ">
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
          <div class="form-input">
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
        </div>

        <input
          type="submit"
          value="Paskelbti"
          class="btn btn-primary"
          @click="createNewPost"
        />
      </div>
    </form>
  </div>
</template>

<style lang="scss" scoped>
#create-post {
  padding-top: 60px;
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
