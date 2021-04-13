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
    ParcelPost,
    TravelPost
  },
  setup() {
    const { state } = useStore();
    const user = computed(() => state.loggedUser);

    const cityStart = ref("");
    const cityEnd = ref("");
    const day = ref("");
    const timeStart = ref("");
    const timeEnd = ref("");
    const show = ref(true);
    const template = ref("");

    function loadParcel() {
      show.value = false;
      template.value = "parcel";
    }

    function loadTravel() {
      show.value = false;
      template.value = "travel";
    }

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
    return {
      cityStart,
      cityEnd,
      day,
      timeStart,
      timeEnd,
      createNewPost,
      loadParcel,
      loadTravel,
      show,
      template
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
      <button id="parcel" class="btn btn-primary" @click="loadParcel">
        Siunčiu
      </button>
      <button id="travel" class="btn btn-primary" @click="loadTravel">
        Keliauju
      </button>
    </div>

    <div v-if="show === false">
      <ParcelPost v-if="template === 'parcel'" />
      <TravelPost v-else-if="template === 'travel'" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.row {
  margin-bottom: 36px;
}

button {
  margin: 10px;
}

.show {
  padding-top: 200px;
}

.hide {
  display: none;
}
</style>
