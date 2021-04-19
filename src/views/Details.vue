<script lang="ts">
import { useStore } from "vuex";
import { computed, onBeforeMount } from "vue";
import Map from "../components/Map.vue";
import moment from "moment";
import Navigation from "../components/Navigation.vue";
import IPost from "@/interfaces/IPost";
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
    let post: IPost;

    function getAPost() {
      post = store.getters["posts/getAPost"](props.id);
      const dayFormated = moment(post.timeStart).format("YYYY-MM-DD");
      const timeStartFormated = moment(post.timeStart).format("HH:mm");
      const timeEndFormated = moment(post.timeEnd).format("HH:mm");
      post.day = dayFormated;
      post.timeStart = timeStartFormated;
      post.timeEnd = timeEndFormated;
      store.dispatch("posts/savePostInMemory", post);
      console.log(store.getters["posts/getAPostInMemory"]);
    }

    onBeforeMount(() => {
      getAPost();
    });

    return {
      post: computed(() => post)
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
                Pradžia: <strong>{{ post.cityStart }}</strong>
              </h5>
              <h5>
                Pabaiga: <strong>{{ post.cityEnd }}</strong>
              </h5>
            </div>
          </div>
          <div class="col-6 content">
            <h1>Vairuotojas</h1>
            <div>
              <h5>
                Vardas:
                <strong
                  >{{ post.author.firstName }}
                  {{ post.author.lastName }}</strong
                >
              </h5>
              <h5>
                Įvertiniams: <strong>{{ post.author.rating }}</strong>
              </h5>
              <h5>
                Atlikta kelionių:
                <strong>{{ post.author.countDelivered }}</strong>
              </h5>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-6 content">
            <h1>Laikas</h1>
            <div>
              <h5>Pradžia: {{ post.day }} {{ post.timeStart }}</h5>
              <h5>Pabaiga: {{ post.day }} {{ post.timeEnd }}</h5>
            </div>
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

function onBeforeMounted(arg0: () => void) { throw new Error('Function not
implemented.'); }
