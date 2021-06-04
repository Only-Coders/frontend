<template>
  <div>
    <v-app-bar app color="navbar" dark>
      <v-row align="center" justify="space-between" no-gutters>
        <v-col cols="4" md="4" class="hidden-sm-and-down">
          <router-link to="/">
            <v-img
              alt="OnlyCoders logo"
              class="shrink ml-md-0 ml-lg-16"
              contain
              src="@/assets/images/only-coders-logo-side-text.png"
              transition="scale-transition"
              width="140"
            />
          </router-link>
        </v-col>
        <v-col cols="10" md="4" lg="5">
          <v-text-field
            hide-details
            v-model="searchParameters"
            label=""
            prepend-inner-icon="mdi-magnify"
            background-color="searchInput"
            rounded
            height="35"
            class="mx-auto"
            placeholder="Search"
          ></v-text-field>
        </v-col>
        <v-col
          cols="2"
          md="3"
          lg="2"
          class="d-flex pa-0"
          :class="$vuetify.breakpoint.lgAndUp ? 'justify-end' : 'justify-center'"
        >
          <div class="icon-container hidden-sm-and-down">
            <v-btn text rounded plain><v-icon color="navbar_icon">mdi-home-variant</v-icon></v-btn>
            <div v-if="this.$route.name === 'Feed'" class="indicator"></div>
          </div>
          <v-btn text rounded plain
            ><v-icon :size="$vuetify.breakpoint.mdAndUp ? '24' : '33'" color="navbar_icon"
              >mdi-message-text</v-icon
            ></v-btn
          >
          <v-btn text rounded plain class="hidden-sm-and-down"><v-icon color="navbar_icon">mdi-bell</v-icon></v-btn>
          <v-btn text rounded plain class="hidden-sm-and-down"
            ><v-icon color="navbar_icon">mdi-account-plus</v-icon></v-btn
          >
        </v-col>
        <v-col cols="2" md="1" lg="1" class="d-flex flex-row-reverse hidden-sm-and-down">
          <div class="hidden-sm-and-down">
            <transition name="scale-transition" mode="out-in" appear>
              <v-menu transition="slide-y-transition" nudge-bottom="45px" bottom avatar>
                <template v-slot:activator="{ on }">
                  <span v-on="on">
                    <v-tooltip bottom>
                      <template v-slot:activator="{ on }">
                        <v-btn large depressed class="header__avatar pa-0" v-on="on">
                          <v-avatar size="50">
                            <v-img alt="user avatar" :src="userData.imageURI" />
                          </v-avatar>
                          <v-icon class="ma-0" color="#f9f9f9">mdi-chevron-down</v-icon>
                        </v-btn>
                      </template>
                      <span class="d-inline-block text-truncate" style="max-width: 150px">{{ userData.fullName }}</span>
                    </v-tooltip>
                  </span>
                </template>
                <v-card width="280px">
                  <v-list rounded>
                    <v-list-item two-line class="px-0 pl-2">
                      <v-list-item-content class="justify-center">
                        <v-row align="center">
                          <v-col cols="3">
                            <v-avatar size="60">
                              <v-img
                                alt="user avatar"
                                :src="
                                  userData.imageURI ? userData.imageURI : require('@/assets/images/default-avatar.png')
                                "
                              />
                            </v-avatar>
                          </v-col>
                          <v-col class="pa-0 pl-2">
                            <v-list-item-title class="pl-4">
                              <h3 class="d-inline-block text-truncate font-weight-medium">
                                {{ userData.fullName ? userData.fullName : "" }}
                              </h3>
                              <h4 class="font-weight-light text-truncate text--secondary">
                                {{ userCurrentPosition.company ? userCurrentPosition.company : "" }}
                              </h4>
                              <h5 class="font-weight-light text-truncate text--secondary">
                                {{ userCurrentPosition.position ? userCurrentPosition.company : "" }}
                              </h5>
                            </v-list-item-title>
                          </v-col>
                        </v-row>
                      </v-list-item-content>
                    </v-list-item>
                    <v-divider></v-divider>
                    <v-list-item class="ma-0 mt-4">
                      <v-list-item-content class="justify-center py-0">
                        <router-link
                          :to="{ name: 'ProfileChild', params: { user: userData.canonicalName } }"
                          class="list-item__router-link"
                        >
                          <v-row align="center" class="mb-0">
                            <v-col cols="2">
                              <v-list-item-icon class="ma-0">
                                <v-icon>mdi-clipboard-account</v-icon>
                              </v-list-item-icon>
                            </v-col>
                            <v-col>
                              <v-list-item-content>
                                <v-list-item-title>Profile</v-list-item-title>
                              </v-list-item-content>
                            </v-col>
                          </v-row>
                        </router-link>
                      </v-list-item-content>
                    </v-list-item>
                    <v-list-item>
                      <v-list-item-content class="justify-center py-0">
                        <router-link to="/settings" class="list-item__router-link">
                          <v-row align="center" class="mb-0">
                            <v-col cols="2">
                              <v-list-item-icon class="ma-0">
                                <v-icon>mdi-cog</v-icon>
                              </v-list-item-icon>
                            </v-col>
                            <v-col class="py-0 asdas">
                              <v-list-item-content>
                                <v-list-item-title>Settings</v-list-item-title>
                              </v-list-item-content>
                            </v-col>
                          </v-row>
                        </router-link>
                      </v-list-item-content>
                    </v-list-item>
                    <v-list-item>
                      <v-list-item-content class="justify-center py-0">
                        <router-link to="/settings" class="list-item__router-link">
                          <v-row align="center" class="mb-0">
                            <v-col cols="2">
                              <v-list-item-icon class="ma-0">
                                <v-icon>mdi-logout-variant</v-icon>
                              </v-list-item-icon>
                            </v-col>
                            <v-col class="py-0 asdas">
                              <v-list-item-content>
                                <v-list-item-title>Logout</v-list-item-title>
                              </v-list-item-content>
                            </v-col>
                          </v-row>
                        </router-link>
                      </v-list-item-content>
                    </v-list-item>
                  </v-list>
                </v-card>
              </v-menu>
            </transition>
          </div>
        </v-col>
      </v-row>
    </v-app-bar>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { UserData } from "@/store/modules/user";

export default Vue.extend({
  name: "Header",

  props: {},

  data: () => ({
    userData: {} as UserData,
    userCurrentPosition: { company: "", position: "" },
    searchParameters: ""
  }),

  methods: {
    getUserProfileFromToken() {
      this.userData = this.$store.state.userModule.user;
      if (this.userData.currentPosition !== "" && typeof this.userData.currentPosition !== undefined) {
        this.userCurrentPosition = {
          company: this.userData.currentPosition.split(" - ")[0],
          position: this.userData.currentPosition.split(" - ")[1]
        };
      }
    }
  },

  created() {
    this.getUserProfileFromToken();
  }
});
</script>

<style lang="scss" scoped>
.header__avatar {
  background: transparent !important;
  width: 85px !important;
  border-radius: 8px;
  min-width: 55px !important;
  height: 55px !important;
}

.header__avatar:after {
  border-radius: 8px !important;
  width: 85px !important;
  color: #fff;
}

.list-item__router-link {
  text-decoration: none !important;
  cursor: pointer !important;
  color: #000000 !important;
}

.icon-container {
  position: relative !important;
}

.indicator {
  position: absolute !important;
  bottom: 0%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 30px;
  height: 2px;
  background: white;
}
</style>
