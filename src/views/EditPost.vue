<script lang="ts">
import City from "../components/formComponents/destination/City.vue";
import { useStore } from "vuex";
import { computed, onMounted, ref } from "vue";
import { updatePost } from "../services/post.api.service";
import router from "@/router";
import moment from "moment";
export default {
  components: {
    City
  },
  props: {
    id: {
      type: String,
      default: ""
    }
  },
  setup(props: any) {
    const store = useStore();
    const user = computed(() => store.state.loggedUser);

    const cityStart = ref("");
    const cityEnd = ref("");
    const day = ref("");
    const timeStart = ref("");
    const timeEnd = ref("");

    function getAPost() {
      const post = store.getters["posts/getAPost"](props.id);
      const dayFormated = moment(post.timeStart).format("YYYY-MM-DD");
      const timeStartFormated = moment(post.timeStart).format("HH:mm");
      const timeEndFormated = moment(post.timeEnd).format("HH:mm");
      cityStart.value = post.cityStart;
      cityEnd.value = post.cityEnd;
      day.value = dayFormated;
      timeStart.value = timeStartFormated;
      timeEnd.value = timeEndFormated;
    }

    function updateAPost() {
      const editedPost = {
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
      updatePost(editedPost, props.id);
      console.log(editedPost);
      router.push("/home");
    }

    onMounted(() => {
      getAPost();
    });

    return { cityStart, cityEnd, day, timeStart, timeEnd, updateAPost };
  }
};
</script>

<template>
  <div id="edit-post" class="">
    <router-link to="/home" tag="button" class="input-button secondary-color">
      Back
    </router-link>
    <h2>Edit post</h2>
    <form class="form">
      <div class="form-inputs container">
        <div class="row w-50">
          <div class="col-lg-6 col-md-12">
            <label for="from">Is kur keliaujate?</label>
            <City v-model="cityStart" name="from"></City>
          </div>
          <div class="col-lg-6 col-md-12">
            <label for="to">I kur keliaujate?</label>
            <City v-model="cityEnd" name="to"></City>
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
          @click="updateAPost"
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
