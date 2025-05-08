import { createApp } from "vue";
import "./assets/index.css";
import App from "./App.vue";
import { createPinia } from "pinia";
import router from "./router";
import { MotionPlugin } from "@vueuse/motion";
import { createSentryPiniaPlugin } from "@sentry/vue";

let pinia = createPinia();
var app = createApp(App);
pinia.use(createSentryPiniaPlugin());
app.use(router);
app.use(pinia);
app.use(MotionPlugin);
app.mount("#app");