import Vue from "vue";
import Vuex from "vuex";
import VuexPersist from "vuex-persist";
import UserModule from "@/store/modules/user";
import UserPaginationModule from "@/store/modules/userPagination";
import { logout } from "@/services/auth";
import router from "@/router";

Vue.use(Vuex);

type State = {
  userModule?: UserModule;
  lang: string;
  shouldRefreshFeed: boolean;
  userPaginationModule?: UserPaginationModule;
};

const persist = new VuexPersist({
  storage: window.localStorage,
  reducer: (state: State) => ({
    userModule: {
      user: state.userModule?.user
    }
  })
});

export default new Vuex.Store<State>({
  state: {
    lang: "en",
    shouldRefreshFeed: false
  },
  mutations: {
    shouldRefreshFeed(state, newValue) {
      state.shouldRefreshFeed = newValue;
    }
  },
  actions: {
    logout: async (context) => {
      context.commit("userModule/CLEAR_USER");
      await logout();
      window.localStorage.clear();
      router.push("/login");
    }
  },
  modules: {
    userModule: UserModule,
    userPaginationModule: UserPaginationModule
  },
  plugins: [persist.plugin]
});
