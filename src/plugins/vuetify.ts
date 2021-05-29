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
        grey_input: "#ebebeb",
        navbar: "#34374B",
        searchInput: "#494C62",
        navbar_icon: "#EDEDED"
      },
      dark: {
        primary: "#00CDAE",
        secondary: "#FF8635",
        accent: "#82B1FF",
        error: "#F76358",
        info: "#2196F3",
        success: "#619d4b",
        warning: "#f9a825",
        primary_light: "#dcf8f3",
        grey_input: "#1E1E1E",
        navbar: "#26272D",
        searchInput: "#494C62",
        navbar_icon: "#EDEDED"
      }
    },
    dark: false,
    options: {
      customProperties: true
    }
  }
});
