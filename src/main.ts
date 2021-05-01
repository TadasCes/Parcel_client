import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import VueStarRating from "vue-star-rating";

createApp(App)
  .use(store)
  .use(router)
  .mount("#app");
