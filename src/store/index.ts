import Vue from "vue";
import Vuex from "vuex";
import VuexPersist from "vuex-persist";
import UserModule from "@/store/modules/user";
import UserPaginationModule from "@/store/modules/userPagination";

Vue.use(Vuex);

type State = {
  userModule?: UserModule;
  lang: string;
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
    lang: "en"
  },
  mutations: {},
  actions: {},
  modules: {
    userModule: UserModule,
    userPaginationModule: UserPaginationModule
  },
  plugins: [persist.plugin]
});
