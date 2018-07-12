import Vue from "vue";
import Vuetify from "vuetify";
import VueAnalytics from "vue-analytics";

import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./registerServiceWorker";
import "vuetify/dist/vuetify.min.css";

Vue.config.productionTip = false;
Vue.use(Vuetify);
Vue.use(VueAnalytics, {
  id: "UA-63688026-2",
  set: [{ field: "anonymizeIp", value: true }],
  router
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
