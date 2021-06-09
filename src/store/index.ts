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
  userPaginationModule?: UserPaginationModule;
  chatModule?: ChatModule;
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
    lang: "en"
  },
  mutations: {},
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
    userPaginationModule: UserPaginationModule,
    chatModule: ChatModule
  },
  plugins: [persist.plugin]
});
