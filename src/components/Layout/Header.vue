<template>
  <div>
    <v-app-bar app color="navbar" dark class="app_bar">
      <v-row align="center" no-gutters class="pr-0">
        <v-col cols="3" class="hidden-sm-and-down ml-6 pr-10 ml-lg-16 pr-lg-14">
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
        <v-col cols="9" sm="9 offset-1" md="5" offset-md="0" lg="5">
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
                  autocomplete="off"
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
          cols="1"
          md="2"
          lg="2"
          class="d-flex pa-0 ml-sm-0 ml-md-8 mr-0 mr-md-3 mr-lg-0"
          :class="$vuetify.breakpoint.lgAndUp ? 'justify-end' : 'justify-center'"
        >
          <div class="icon-container hidden-sm-and-down">
            <v-btn text rounded plain link to="/" class="px-0 mx-0"
              ><v-icon color="navbar_icon">mdi-home-variant</v-icon></v-btn
            >
            <div v-if="this.$route.name === 'Feed'" class="indicator"></div>
          </div>

          <div class="icon-container">
            <v-btn text class="pl-12 pl-sm-6 pl-md-5" rounded plain link to="/chat">
              <v-badge :content="messages" :value="messages" color="primary" overlap>
                <v-icon :size="$vuetify.breakpoint.mdAndUp ? '24' : '33'" color="navbar_icon">mdi-message-text</v-icon>
              </v-badge>
              <div v-if="this.$route.name === 'Chat'" class="indicator"></div>
            </v-btn>
          </div>

          <v-menu
            :close-on-content-click="false"
            close-on-click
            bottom
            left
            nudge-bottom="45px"
            v-model="showNotifications"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                text
                rounded
                plain
                class="hidden-sm-and-down"
                @click="showNotifications = !showNotifications"
                v-bind="attrs"
                v-on="on"
              >
                <v-badge :content="notificationsCount" :value="notificationsCount" color="primary" overlap>
                  <v-icon color="navbar_icon">mdi-bell</v-icon>
                </v-badge>
              </v-btn>
            </template>
            <div v-if="notifications.length > 0">
              <v-card
                max-width="550px"
                min-width="200px"
                min-height="100px"
                max-height="350px"
                class="header__notification__card"
              >
                <v-list-item v-for="notification in notifications" :key="notification.id" class="pr-0">
                  <v-avatar size="45">
                    <v-img
                      alt="user"
                      class="font-weight-ligth pr-2 pb-0 user_name"
                      :src="
                        notification.imageURI ? notification.imageURI : require('@/assets/images/default-avatar.png')
                      "
                      style="cursor: pointer"
                      @click="redirectToProfile(notification.canonicalName)"
                    />
                  </v-avatar>
                  <v-list-item-content class="pl-3">
                    <v-list-item-title>
                      <span
                        class="font-weight-bold header__notification__fromName"
                        @click="redirectToProfile(notification.canonicalName)"
                        >{{ notification.from }}</span
                      >
                    </v-list-item-title>
                    <v-list-item-subtitle class="pr-6">
                      {{ notification.message }}
                      <span class="text--secondary text-body-2">{{ notification.formattedDate }}</span>
                    </v-list-item-subtitle>
                  </v-list-item-content>
                  <v-list-item-action v-if="notification.eventType === 'NEW_FOLLOWER'">
                    <v-btn
                      v-if="!notification.sourceIsFollower"
                      color="primary"
                      class="px-2"
                      small
                      outlined
                      depressed
                      @click="followUser(notification)"
                    >
                      {{ $i18n.t("Notifications.follow") }}
                    </v-btn>

                    <v-btn
                      v-if="notification.sourceIsFollower"
                      color="primary"
                      class="px-2 header__notification__follow-button"
                      small
                      depressed
                    >
                      {{ $i18n.t("Notifications.following") }}
                    </v-btn>
                  </v-list-item-action>
                  <v-list-item-action v-if="notification.eventType === 'CONTACT_REQUEST'">
                    <v-btn
                      v-if="!notification.sourceIsContact"
                      color="primary"
                      class="px-2"
                      small
                      depressed
                      @click="acceptContactRequest(notification)"
                    >
                      {{ $i18n.t("Notifications.accept") }}
                    </v-btn>

                    <v-btn
                      v-if="notification.sourceIsContact"
                      color="primary"
                      class="px-2 header__notification__follow-button"
                      small
                      depressed
                    >
                      {{ $i18n.t("Notifications.accepted") }}
                    </v-btn>
                  </v-list-item-action>

                  <v-list-item-action class="ml-2">
                    <v-icon size="15" @click="markNotificationAsRead(notification)"> mdi-window-close </v-icon>
                  </v-list-item-action>
                </v-list-item>
                <div v-if="notifications.length > 0">
                  <v-divider></v-divider>
                  <div class="d-flex justify-center">
                    <v-btn text rounded plain @click="markAllNotificationAsRead">{{
                      $i18n.t("Notifications.clearAll")
                    }}</v-btn>
                  </div>
                </div>
              </v-card>
            </div>
            <v-card v-else class="d-flex justify-center align-center" width="350px" height="150px">
              <v-card-title class="font-weight-light subtitle-1">{{
                $i18n.t("Notifications.noNotifications")
              }}</v-card-title>
            </v-card>
          </v-menu>
        </v-col>
        <v-col cols="2" md="1" class="d-flex flex-row-reverse hidden-sm-and-down">
          <div class="hidden-sm-and-down">
            <transition name="scale-transition" mode="out-in" appear>
              <v-menu transition="slide-y-transition" nudge-bottom="45px" bottom avatar>
                <template v-slot:activator="{ on }">
                  <span v-on="on">
                    <v-tooltip bottom>
                      <template v-slot:activator="{ on }">
                        <v-btn large depressed class="header__avatar pa-0" v-on="on">
                          <AvatarImagePreview
                            :src="userData.imageURI ? userData.imageURI : require('@/assets/images/default-avatar.png')"
                            :imageSize="50"
                            class="profile__banner__avatar"
                            alt="user_avatar"
                          ></AvatarImagePreview>

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
                                {{ $store.state.userModule.user.fullName ? $store.state.userModule.user.fullName : "" }}
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
                                <v-list-item-title>{{ $i18n.t("Header.profile") }}</v-list-item-title>
                              </v-list-item-content>
                            </v-col>
                          </v-row>
                        </router-link>
                      </v-list-item-content>
                    </v-list-item>

                    <v-list-item @click="showConfigurationsDialog = true">
                      <v-list-item-icon class="mr-2">
                        <v-list-item-icon class="ma-0">
                          <v-icon>mdi-cog</v-icon>
                        </v-list-item-icon>
                      </v-list-item-icon>
                      <v-list-item-title class="ml-3">{{ $i18n.t("Header.settings") }}</v-list-item-title>
                    </v-list-item>

                    <v-list-item @click="logout">
                      <v-list-item-icon class="mr-2">
                        <v-list-item-icon class="ma-0">
                          <v-icon>mdi-logout-variant</v-icon>
                        </v-list-item-icon>
                      </v-list-item-icon>
                      <v-list-item-title class="ml-3">{{ $i18n.t("Header.logout") }}</v-list-item-title>
                    </v-list-item>
                  </v-list>
                </v-card>
              </v-menu>
            </transition>
          </div>
        </v-col>
      </v-row>
    </v-app-bar>
    <ConfigurationsDialog v-model="showConfigurationsDialog" :value="showConfigurationsDialog"></ConfigurationsDialog>
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
import AvatarImagePreview from "@/components/AvatarImagePreview.vue";
import { formatDistanceStrict } from "date-fns";
import { postFollow } from "@/services/follow";
import ConfigurationsDialog from "@/components/Layout/ConfigurationsDialog.vue";
import { postContactRequestResponse } from "@/services/receivedContactRequests";

type Notification = {
  eventType: string;
  message: string;
  read: boolean;
  to: string;
  id: string;
  from: string;
  createdAt: string;
  imageURI: string;
  formattedDate: string;
  canonicalName: string;
  sourceIsFollower: boolean;
  sourceIsContact: boolean;
};

export default Vue.extend({
  name: "Header",

  components: {
    Search,
    AvatarImagePreview,
    ConfigurationsDialog
  },

  data: () => ({
    userData: {} as UserData,
    userCurrentPosition: { company: "", position: "" },
    notifications: [] as Notification[],
    searchParameters: "",
    messages: 0,
    notificationsCount: 0,
    showSearchComponent: false,
    filteredUsers: { currentPage: 0, totalElements: 0, totalPages: 0, content: [] } as Pagination<User>,
    recommendedTags: [] as Tag[],
    usersLoading: false,
    tagsLoading: false,
    timer: 0,
    showOverlay: false,
    showNotifications: false,
    showConfigurationsDialog: false
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
            this.notificationsCount = Object.keys(notificationSnapshot.val()).length;
            this.notifications = Object.keys(notificationSnapshot.val()).map((key) => {
              const notification = notificationSnapshot.val()[key];
              const notificationDate = formatDistanceStrict(new Date(notification.createdAt), new Date());
              const formattedDate = notificationDate.split(" ")[0] + notificationDate.split(" ")[1][0];
              return {
                ...notification,
                id: key,
                formattedDate
              };
            });
            this.notifications = this.notifications.reverse();
          } else {
            this.notificationsCount = 0;
            this.notifications = [];
          }
        });
    },

    async markAllNotificationAsRead() {
      const promises = this.notifications.map((notification) =>
        database.ref(`notifications/${this.user.canonicalName}/${notification.id}`).update({ read: true })
      );
      await Promise.all(promises);
      this.notifications = [];
    },

    async markNotificationAsRead(notification: Notification) {
      await database.ref(`notifications/${this.user.canonicalName}/${notification.id}`).update({ read: true });
    },

    async followUser(notification: Notification) {
      await postFollow(notification.canonicalName);
      notification.sourceIsFollower = true;
      await database
        .ref(`notifications/${this.user.canonicalName}/${notification.id}`)
        .update({ sourceIsFollower: true });
    },

    async acceptContactRequest(notification: Notification) {
      await postContactRequestResponse({
        requesterCanonicalName: notification.canonicalName,
        acceptContact: true
      });
      notification.sourceIsContact = true;
      await database
        .ref(`notifications/${this.user.canonicalName}/${notification.id}`)
        .update({ sourceIsContact: true });
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
    },

    redirectToProfile(canonicalName: string) {
      const redirectTo = `/profile/${canonicalName}`;
      if (this.$router.currentRoute.path === redirectTo) {
        window.scroll({
          top: 0,
          left: 0,
          behavior: "smooth"
        });
      } else {
        this.$router.push(redirectTo);
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

.header__notification__fromName {
  cursor: pointer;
}

.header__notification__card {
  overflow-y: auto;
}

.header__notification__follow-button {
  opacity: 0.6;
}
</style>
<style>
.v-menu__content {
  border-radius: 15px !important;
}
.app_bar {
  z-index: 9999 !important;
}
.v-toolbar__content {
  margin: 0;
  padding: 0;
}
</style>
