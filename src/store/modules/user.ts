import { Module, VuexModule, config, getModule } from "vuex-module-decorators";
import store from "@/store";

config.rawError = true;
@Module({
  name: "user",
  namespaced: true,
  dynamic: true,
  store
})
class User extends VuexModule {
  username = "pepe";
}

export default getModule(User);
