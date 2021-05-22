import Vue from "vue";
import Vuetify from "vuetify/lib/framework";

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    themes: {
      light: {
        primary: "#00CDAE",
        secondary: "#FF8635",
        accent: "#82B1FF",
        error: "#F76358",
        info: "#2196F3",
        success: "#619d4b",
        warning: "#f9a825",
        primary_light: "#dcf8f3",
        grey_input: "#ebebeb"
      }
    },
    options: {
      customProperties: true
    }
  }
});
