import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "@/store/index";
import vuetify from "./plugins/vuetify";
import VueI18n from "vue-i18n";
import Locale from "@/locale/index";
import Notifications from "vue-notification";
import VueApexCharts from "vue-apexcharts";

Vue.use(VueApexCharts);
Vue.use(VueI18n);
Vue.use(Notifications);
Vue.component("apexchart", VueApexCharts);

Vue.config.productionTip = false;

export const i18n = new VueI18n({
  locale: store.state.lang,
  messages: { es: Locale.es, en: Locale.en }
});

new Vue({
  router,
  store,
  i18n,
  vuetify,
  render: (h) => h(App)
}).$mount("#app");
