import Vue from "vue";
import Vuex from "vuex";
import VuexPersist from "vuex-persist";
import UserModule from "@/store/modules/user";
import UserPaginationModule from "@/store/modules/adminPagination";
import AdminPaginationModule from "@/store/modules/adminPagination";
import ChatModule from "@/store/modules/chat";
import { logout } from "@/services/auth";
import router from "@/router";

Vue.use(Vuex);

type State = {
  userModule?: UserModule;
  lang: string;
  shouldRefreshFeed: boolean;
  userPaginationModule?: UserPaginationModule;
  adminPaginationModule?: AdminPaginationModule;
  chatModule?: ChatModule;
};

const persist = new VuexPersist({
  storage: window.localStorage,
  reducer: (state: State) => ({
    userModule: {
      user: state.userModule?.user
    },
    userPaginationModule: {
      adminPagination: state.userPaginationModule?.adminPagination
    },
    adminPaginationModule: {
      adminPagination: state.adminPaginationModule?.adminPagination
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
    adminPaginationModule: UserPaginationModule,
    chatModule: ChatModule
  },
  plugins: [persist.plugin]
});
