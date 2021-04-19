<template>
  <form class="form">
    <div class="row">
      <div class="col-12">
        <h2>Keliauju tarp miestų</h2>
      </div>
    </div>
    <div class="form-inputs container">
      <div class="row w-50">
        <div class="col-12">
          <label for="from">Iš kur keliaujate?</label>
          <City
            name="from"
            title="Pasirinkite miestą"
            @update:city="cityStart = $event"
          />
        </div>
        <div class="col-12">
          <label for="to">Į kur keliaujate?</label>
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
      </div>

      <div></div>
      <input
        type="submit"
        value="Paskelbti"
        class="btn btn-primary"
        @click="createNewPost"
      />
      <router-link to="/" tag="button" class="input-button secondary-color">
        Back
      </router-link>
    </div>
  </form>
</template>

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

    const { state } = useStore();
    const user = computed(() => state.loggedUser);

    function createNewPost(): void {
      const newPost: IPost = {
        cityStart: cityStart.value,
        cityEnd: cityEnd.value,
        day: day.value,
        timeStart: "",
        timeEnd: "",
        author: {
          id: user.value._id,
          firstName: user.value.firstName,
          lastName: user.value.lastName,
          rating: user.value.rating,
          phone: user.value.phone,
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
      createNewPost
    };
  }
};
</script>

<style lang="scss" scoped>
form {
  padding-top: 20px;
}
.col-12 {
  margin-bottom: 60px;
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
