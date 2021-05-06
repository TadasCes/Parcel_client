import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import VueStarRating from "vue-star-rating";
import gAuth from "vue3-google-auth";

const $gAuth = gAuth.createGAuth({
  clientId:
    "334910610012-tcn27ghk05rhiv0dmvd9q5c79mnp6o09.apps.googleusercontent.com",
  scope: "https://www.googleapis.com/auth/userinfo.email"
});

createApp(App)
  .use(store)
  .use(router)
  .use($gAuth)
  .mount("#app");
