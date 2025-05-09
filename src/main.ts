import { createApp } from "vue";
import "./assets/index.css";
import App from "./App.vue";
import { createPinia } from "pinia";
import router from "./router";
import { MotionPlugin } from "@vueuse/motion";
import { createSentryPiniaPlugin } from "@sentry/vue";
import * as Sentry from "@sentry/vue";

let pinia = createPinia();
var app = createApp(App);
pinia.use(createSentryPiniaPlugin());
Sentry.init({
    app,
    integrations: [
      Sentry.browserTracingIntegration({ router }),
      Sentry.replayIntegration({
        maskAllText: false,
        blockAllMedia: false
      }),
      Sentry.replayCanvasIntegration()
    ],
    tracesSampleRate: 1.0,
    replaysSessionSampleRate: 1.0,
    replaysOnErrorSampleRate: 1.0,
    dsn: "https://c5c632beb505fc8847aa41c75ec350ad@sentry.svck.dev/8"
  });
app.use(router);
app.use(pinia);
app.use(MotionPlugin);
app.mount("#app");