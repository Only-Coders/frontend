<template>
  <div>
    <v-app-bar app color="navbar" dark class="app_bar">
      <v-row align="center" justify="space-between" no-gutters>
        <v-col cols="4" md="4" class="hidden-sm-and-down">
          <v-img
            alt="OnlyCoders logo"
            class="shrink ml-md-0 ml-lg-16 feed_link"
            contain
            src="@/assets/images/only-coders-logo-side-text.png"
            transition="scale-transition"
            width="140"
            @click="redirectToFeed"
          />
        </v-col>
        <v-overlay :value="showOverlay" opacity="0.60"></v-overlay>
        <v-col cols="10" md="4" lg="5">
          <transition name="scale-transition" mode="out-in" appear>
            <v-menu
              :close-on-content-click="false"
              close-on-click
              bottom
              nudge-bottom="45px"
              attach=".v-overlay"
              v-model="showOverlay"
            >
              <template v-slot:activator="{ on, attrs }">
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
                  @focus="getRecommendedTags"
                  v-bind="attrs"
                  v-on="on"
                  @click="showOverlay = !showOverlay"
                ></v-text-field>
              </template>
              <Search
                :filteredUsers="filteredUsers"
                :tags="recommendedTags"
                :areTagsLoading="tagsLoading"
                :areUsersLoading="usersLoading"
                :filters="searchParameters"
              ></Search>
            </v-menu>
          </transition>
        </v-col>
        <v-col
          cols="2"
          md="3"
          lg="2"
          class="d-flex pa-0"
          :class="$vuetify.breakpoint.lgAndUp ? 'justify-end' : 'justify-center'"
        >
          <div class="icon-container hidden-sm-and-down">
            <v-btn text rounded plain link to="/"><v-icon color="navbar_icon">mdi-home-variant</v-icon></v-btn>
            <div v-if="this.$route.name === 'Feed'" class="indicator"></div>
          </div>

          <div class="icon-container">
            <v-btn text rounded plain link to="/chat">
              <v-badge :content="messages" :value="messages" color="primary" overlap>
                <v-icon :size="$vuetify.breakpoint.mdAndUp ? '24' : '33'" color="navbar_icon">mdi-message-text</v-icon>
              </v-badge>
              <div v-if="this.$route.name === 'Chat'" class="indicator"></div>
            </v-btn>
          </div>

          <v-btn text rounded plain class="hidden-sm-and-down">
            <v-badge :content="notifications" :value="notifications" color="primary" overlap>
              <v-icon color="navbar_icon">mdi-bell</v-icon>
            </v-badge>
          </v-btn>
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
                            <v-img
                              alt="user avatar"
                              :src="
                                userData.imageURI ? userData.imageURI : require('@/assets/images/default-avatar.png')
                              "
                            />
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
                                  $store.state.userModule.user.imageURI
                                    ? $store.state.userModule.user.imageURI
                                    : require('@/assets/images/default-avatar.png')
                                "
                              />
                            </v-avatar>
                          </v-col>
                          <v-col class="pa-0 pl-2">
                            <v-list-item-title class="pl-4">
                              <h3 class="d-inline-block text-truncate font-weight-medium">
                                {{ userData.fullName ? userData.fullName : "" }}
                              </h3>
                              <div v-if="userCurrentPosition.company">
                                <h4 class="font-weight-light text-truncate text--secondary">
                                  {{ userCurrentPosition.position ? userCurrentPosition.position : "" }}
                                </h4>
                                <h5 class="font-weight-light text-truncate text--secondary">
                                  {{
                                    `${$i18n.t("at")} ${userCurrentPosition.company ? userCurrentPosition.company : ""}`
                                  }}
                                </h5>
                              </div>
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

                    <v-list-item @click.prevent>
                      <v-list-item-icon class="mr-2">
                        <v-list-item-icon class="ma-0">
                          <v-icon>mdi-cog</v-icon>
                        </v-list-item-icon>
                      </v-list-item-icon>
                      <v-list-item-title class="ml-3"> Setting </v-list-item-title>
                    </v-list-item>

                    <v-list-item @click="logout">
                      <v-list-item-icon class="mr-2">
                        <v-list-item-icon class="ma-0">
                          <v-icon>mdi-logout-variant</v-icon>
                        </v-list-item-icon>
                      </v-list-item-icon>
                      <v-list-item-title class="ml-3"> Logout </v-list-item-title>
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
import { database } from "@/plugins/firebaseInit";
import Search from "@/components/Feed/Search.vue";
import { getTags } from "@/services/suggested-tags";
import { User } from "@/models/user";
import { getUser } from "@/services/user";
import { Tag } from "@/models/tag";
import { Pagination } from "@/models/Pagination/pagination";
import { UsersOptionsOrderBy } from "@/models/Enums/usersOptionsOrderBy";

export default Vue.extend({
  name: "Header",

  components: { Search },

  data: () => ({
    userData: {} as UserData,
    userCurrentPosition: { company: "", position: "" },
    searchParameters: "",
    messages: 0,
    notifications: 0,
    showSearchComponent: false,
    filteredUsers: { currentPage: 0, totalElements: 0, totalPages: 0, content: [] } as Pagination<User>,
    recommendedTags: [] as Tag[],
    usersLoading: false,
    tagsLoading: false,
    timer: 0,
    showOverlay: false
  }),

  methods: {
    getUserProfileFromToken() {
      this.userData = this.$store.state.userModule.user;
      if (this.userData.currentPosition) {
        this.userCurrentPosition = {
          position: this.userData.currentPosition.split(" - ")[0],
          company: this.userData.currentPosition.split(" - ")[1]
        };
      }
    },

    async getRecommendedTags() {
      this.tagsLoading = true;
      this.recommendedTags = await getTags(3);
      this.tagsLoading = false;
    },

    async logout() {
      await this.$store.dispatch("logout");
    },

    listenToUnreadMessages() {
      database.ref(`users/${this.user.canonicalName}/chats`).on("value", (userSnapshot) => {
        userSnapshot.forEach((userData) => {
          database
            .ref(`chats/${userData.val().key}/messages`)
            .orderByChild("read")
            .equalTo(false)
            .on("value", (chatSnapshot) => {
              if (chatSnapshot.val()) {
                this.messages = Object.keys(chatSnapshot.val()).reduce((prevValue, currentValue) => {
                  if (chatSnapshot.val()[currentValue]["from"] != this.user.canonicalName) {
                    return ++prevValue;
                  }
                  return prevValue;
                }, 0);
              } else {
                this.messages = 0;
              }
            });
        });
      });
    },

    listenToUnreadNotifications() {
      database
        .ref(`notifications/${this.user.canonicalName}`)
        .orderByChild("read")
        .equalTo(false)
        .on("value", (notificationSnapshot) => {
          if (notificationSnapshot.val()) {
            this.notifications = Object.keys(notificationSnapshot.val()).length;
          } else {
            this.notifications = 0;
          }
        });
    },

    redirectToFeed() {
      if (this.$router.currentRoute.path === "/") {
        window.scroll({
          top: 0,
          left: 0,
          behavior: "smooth"
        });
        this.$store.commit("shouldRefreshFeed", true);
      } else {
        this.$router.push("/");
      }
    }
  },

  computed: {
    user(): UserData {
      return this.$store.state.userModule.user;
    }
  },

  watch: {
    searchParameters() {
      if (this.searchParameters) {
        this.usersLoading = true;
        if (this.timer != 0) {
          clearTimeout(this.timer);
        }

        this.timer = setTimeout(async () => {
          try {
            const result = await getUser({
              partialName: this.searchParameters,
              size: 5,
              orderBy: UsersOptionsOrderBy.FIRSTNAME
            });
            this.filteredUsers = result;
          } catch (error) {
            clearTimeout(this.timer);
          } finally {
            this.usersLoading = false;
          }
        }, 200);
      }
    }
  },

  created() {
    this.listenToUnreadMessages();
    this.listenToUnreadNotifications();
    this.getUserProfileFromToken();
  }
});
</script>

<style>
.v-overlay {
  height: 100vh;
}
</style>

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
.feed_link {
  cursor: pointer;
}
</style>
<style>
.v-menu__content {
  overflow: hidden !important;
  border-radius: 15px !important;
}
.app_bar {
  z-index: 9999 !important;
}
</style>
