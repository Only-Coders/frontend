import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "@/store/index";
import vuetify from "./plugins/vuetify";
import VueI18n from "vue-i18n";
import Locale from "@/locale/index";

Vue.use(VueI18n);

Vue.config.productionTip = false;

const i18n = new VueI18n({
  locale: store.state.lang,
  messages: { sp: Locale.sp, en: Locale.en }
});

new Vue({
  router,
  store,
  i18n,
  vuetify,
  render: (h) => h(App)
}).$mount("#app");
