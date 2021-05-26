<template>
  <div>
    <v-app-bar app color="navbar" dark>
      <v-row align="center">
        <v-col cols="3">
          <router-link to="/">
            <v-img
              alt="OnlyCoders logo"
              class="shrink ml-16"
              contain
              src="@/assets/images/only-coders-logo-side-text.png"
              transition="scale-transition"
              width="140"
            />
          </router-link>
        </v-col>
        <v-col cols="2">
          <v-text-field
            v-model="searchParameters"
            label=""
            prepend-inner-icon="mdi-magnify"
            background-color="searchInput"
            rounded
            height="35"
            class="mt-5"
            placeholder="Search"
          ></v-text-field>
        </v-col>
        <v-col cols="3">
          <v-btn text rounded plain><v-icon color="navbar_icon">mdi-home-variant</v-icon></v-btn>
          <v-btn text rounded plain><v-icon color="navbar_icon">mdi-message-text</v-icon></v-btn>
          <v-btn text rounded plain><v-icon color="navbar_icon">mdi-bell</v-icon></v-btn>
          <v-btn text rounded plain><v-icon color="navbar_icon">mdi-account-plus</v-icon></v-btn>
        </v-col>
        <v-col cols="4">
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
              <v-card width="200px">
                <v-list rounded>
                  <v-list-item two-line>
                    <v-list-item-content class="justify-center">
                      <div class="">
                        <v-avatar size="50">
                          <v-img alt="user avatar" :src="userData.imageURI" />
                        </v-avatar>
                        <v-list-item-title>
                          <span class="d-inline-block text-truncate" style="max-width: 150px">{{
                            userData.fullName
                          }}</span>
                        </v-list-item-title>
                      </div>
                    </v-list-item-content>
                  </v-list-item>
                  <v-list-item two-line>
                    <v-list-item-content class="justify-center">
                      <div class="text-center mx-auto">
                        <v-list-item-title>
                          <span class="d-inline-block text-truncate" style="max-width: 150px">Logout </span>
                        </v-list-item-title>
                      </div>
                    </v-list-item-content>
                  </v-list-item>
                </v-list>
              </v-card>
            </v-menu>
          </transition>
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
    searchParameters: ""
  }),

  created() {
    this.userData = this.$store.state.userModule.user;
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
</style>
