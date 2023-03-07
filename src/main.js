import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import vuetify from "./plugins/vuetify";
import Vuelidate from "vuelidate";
import store from "./store";

Vue.config.productionTip = false;

Vue.filter("upCase", function (val) {
  return val.toUpperCase();
});

new Vue({
  store,
  router,
  vuetify,
  Vuelidate,
  render: (h) => h(App),
}).$mount("#app");
