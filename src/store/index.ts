import Vue from "vue";
import Vuex from "vuex";
import VuexPersist from "vuex-persist";
import UserModule from "@/store/modules/user";
import UserPaginationModule from "@/store/modules/userPagination";
import ChatModule from "@/store/modules/chat";
import { logout } from "@/services/auth";
import router from "@/router";

Vue.use(Vuex);

type State = {
  userModule?: UserModule;
  lang: string;
  shouldRefreshFeed: boolean;
  userPaginationModule?: UserPaginationModule;
  chatModule?: ChatModule;
};

const persist = new VuexPersist({
  storage: window.localStorage,
  reducer: (state: State) => ({
    userModule: {
      user: state.userModule?.user
    },
    userPaginationModule: {
      userPagination: state.userPaginationModule?.userPagination
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
      await logout();
      window.localStorage.clear();
      router.push("/login");
      context.commit("userModule/CLEAR_USER");
    }
  },
  modules: {
    userModule: UserModule,
    userPaginationModule: UserPaginationModule,
    chatModule: ChatModule
  },
  plugins: [persist.plugin]
});
