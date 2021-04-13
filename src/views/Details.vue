<script lang="ts">
import { useStore } from "vuex";
import { onMounted, ref } from "vue";
import moment from "moment";
import Navigation from "../components/Navigation.vue";
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
    // const user = computed(() => store.state.loggedUser);
    console.log(props.id);
    const cityStart = ref("");
    const cityEnd = ref("");
    const day = ref("");
    const timeStart = ref("");
    const timeEnd = ref("");
    const firstName = ref("");
    const lastName = ref("");
    const rating = ref("");
    const countDelivered = ref("");
    const post: any = ref({});

    function getAPost() {
      post.value = store.getters["posts/getAPost"](props.id);
      const dayFormated = moment(post.value.timeStart).format("YYYY-MM-DD");
      const timeStartFormated = moment(post.value.timeStart).format("HH:mm");
      const timeEndFormated = moment(post.value.timeEnd).format("HH:mm");
      cityStart.value = post.value.cityStart;
      cityEnd.value = post.value.cityEnd;
      day.value = dayFormated;
      timeStart.value = timeStartFormated;
      timeEnd.value = timeEndFormated;
      firstName.value = post.value.author.firstName;
      lastName.value = post.value.author.lastName;
      rating.value = post.value.author.rating;
      countDelivered.value = post.value.author.countDelivered;

      console.log(post.value);
    }

    onMounted(() => {
      getAPost();
    });

    return {
      cityStart,
      cityEnd,
      day,
      timeStart,
      timeEnd,
      firstName,
      lastName,
      rating,
      countDelivered,
      post
    };
  }
};
</script>

<template>
  <div id="edit-post" class="">
    <Navigation />
    <div class="container">
      <router-link to="/home" tag="button" class="input-button">
        Back
      </router-link>
      <div>
        <h2>Post details</h2>
      </div>
      <div class="container">
        <div class="row">
          <div class="col-6 content">
            <h1>Maršrutas</h1>
            <div>
              <h5>
                Pradžia: <strong>{{ cityStart }}</strong>
              </h5>
              <h5>
                Pabaiga: <strong>{{ cityEnd }}</strong>
              </h5>
            </div>
          </div>
          <div class="col-6 content">
            <h1>Vairuotojas</h1>
            <div>
              <h5>
                Vardas: <strong>{{ firstName }} {{ lastName }}</strong>
              </h5>
              <h5>
                Įvertiniams: <strong>{{ rating }}</strong>
              </h5>
              <h5>
                Atlikta kelionių: <strong>{{ countDelivered }}</strong>
              </h5>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-6 content">
            <h1>Laikas</h1>
            <div>
              <h5>Pradžia: {{ day }} {{ timeStart }}</h5>
              <h5>Pabaiga: {{ day }} {{ timeEnd }}</h5>
            </div>
          </div>
          <div class="col-6 content">
            <h1>Žemėlapis</h1>
            <img src="https://via.placeholder.com/300" alt="" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
#create-post {
  padding-top: 60px;
}

.content {
  height: 200px;
  padding: 0 24px 24px 0;
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
