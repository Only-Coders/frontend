<template>
  <v-dialog :value="value" @input="close" transition="dialog-top-transition" width="670px" height="700px">
    <v-card max-width="670px" max-height="700px">
      <v-toolbar color="primary" dark>
        <h2>Settings</h2>
        <v-spacer></v-spacer>
        <v-btn class="mt-1" icon @click="close">
          <v-icon size="20"> mdi-close </v-icon>
        </v-btn>
      </v-toolbar>
      <v-tabs vertical>
        <v-tab>Notifications</v-tab>
        <v-tab-item class="ml-10">
          <div>
            <v-card-title class="pl-0 font-weight-regular">New Post</v-card-title>
            <v-card-subtitle class="pa-0">Find out when a contact creates a new post</v-card-subtitle>
            <v-row no-gutters class="align-center">
              <v-col cols="auto">
                <v-checkbox v-model="notifications.NEW_POST.email"></v-checkbox>
              </v-col>
              <v-col cols="auto" class="pl-0">
                <h4 class="ma-0 font-weight-light">Email</h4>
              </v-col>
              <v-col cols="auto" class="ml-4">
                <v-checkbox v-model="notifications.NEW_POST.push"></v-checkbox>
              </v-col>
              <v-col cols="auto" class="pl-0">
                <h4 class="ma-0 font-weight-light">Push</h4>
              </v-col>
            </v-row>
          </div>
          <div>
            <v-card-title class="pl-0 font-weight-regular">New Comments</v-card-title>
            <v-card-subtitle class="pa-0"
              >Find out when someone leves a new comment on one of your posts</v-card-subtitle
            >
            <v-row no-gutters class="align-center">
              <v-col cols="auto">
                <v-checkbox v-model="notifications.NEW_COMMENT.email"></v-checkbox>
              </v-col>
              <v-col cols="auto" class="pl-0">
                <h4 class="ma-0 font-weight-light">Email</h4>
              </v-col>
              <v-col cols="auto" class="ml-4">
                <v-checkbox v-model="notifications.NEW_COMMENT.push"></v-checkbox>
              </v-col>
              <v-col cols="auto" class="pl-0">
                <h4 class="ma-0 font-weight-light">Push</h4>
              </v-col>
            </v-row>
          </div>
          <div>
            <v-card-title class="pl-0 font-weight-regular">New Mentions</v-card-title>
            <v-card-subtitle class="pa-0">Get a heads up when your mentioned on someone's post</v-card-subtitle>
            <v-row no-gutters class="align-center">
              <v-col cols="auto">
                <v-checkbox v-model="notifications.NEW_MENTION.email"></v-checkbox>
              </v-col>
              <v-col cols="auto" class="pl-0">
                <h4 class="ma-0 font-weight-light">Email</h4>
              </v-col>
              <v-col cols="auto" class="ml-4">
                <v-checkbox v-model="notifications.NEW_MENTION.push"></v-checkbox>
              </v-col>
              <v-col cols="auto" class="pl-0">
                <h4 class="ma-0 font-weight-light">Push</h4>
              </v-col>
            </v-row>
          </div>
          <div>
            <v-card-title class="pl-0 font-weight-regular">New Contact Request</v-card-title>
            <v-card-subtitle class="pa-0">Get notifications when someone sends you a contact request</v-card-subtitle>
            <v-row no-gutters class="align-center">
              <v-col cols="auto">
                <v-checkbox v-model="notifications.CONTACT_REQUEST.email"></v-checkbox>
              </v-col>
              <v-col cols="auto" class="pl-0">
                <h4 class="ma-0 font-weight-light">Email</h4>
              </v-col>
              <v-col cols="auto" class="ml-4">
                <v-checkbox v-model="notifications.CONTACT_REQUEST.push"></v-checkbox>
              </v-col>
              <v-col cols="auto" class="pl-0">
                <h4 class="ma-0 font-weight-light">Push</h4>
              </v-col>
            </v-row>
          </div>
          <div>
            <v-card-title class="pl-0 font-weight-regular">New Follower</v-card-title>
            <v-card-subtitle class="pa-0">Get a notification when someone follows you</v-card-subtitle>
            <v-row no-gutters class="align-center">
              <v-col cols="auto">
                <v-checkbox v-model="notifications.NEW_FOLLOWER.email"></v-checkbox>
              </v-col>
              <v-col cols="auto" class="pl-0">
                <h4 class="ma-0 font-weight-light">Email</h4>
              </v-col>
              <v-col cols="auto" class="ml-4">
                <v-checkbox v-model="notifications.NEW_FOLLOWER.push"></v-checkbox>
              </v-col>
              <v-col cols="auto" class="pl-0">
                <h4 class="ma-0 font-weight-light">Push</h4>
              </v-col>
            </v-row>
          </div>
          <div>
            <v-card-title class="pl-0 font-weight-regular">New Contact Accepted</v-card-title>
            <v-card-subtitle class="pa-0"
              >Recieve a notification when someone accepts your contact request</v-card-subtitle
            >
            <v-row no-gutters class="align-center">
              <v-col cols="auto">
                <v-checkbox v-model="notifications.CONTACT_ACCEPTED.email"></v-checkbox>
              </v-col>
              <v-col cols="auto" class="pl-0">
                <h4 class="ma-0 font-weight-light">Email</h4>
              </v-col>
              <v-col cols="auto" class="ml-4">
                <v-checkbox v-model="notifications.CONTACT_ACCEPTED.push"></v-checkbox>
              </v-col>
              <v-col cols="auto" class="pl-0">
                <h4 class="ma-0 font-weight-light">Push</h4>
              </v-col>
            </v-row>
          </div>
          <v-row no-gutters class="d-flex justify-end pt-8 pb-4">
            <v-col cols="auto">
              <v-btn color="primary" class="mr-8" small @click="changeNotificationSettings" :loading="isButtonLoading">
                {{ $i18n.t("confirm") }}
              </v-btn>
            </v-col>
          </v-row>
        </v-tab-item>
      </v-tabs>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import Vue from "vue";
import { VueConstructor } from "vue/types/umd";
import { NotificationType } from "@/models/Enums/notificationType";
import { getUserNotificationsConfig } from "@/services/notifications";
import { putChangeNotifications } from "@/services/notifications";
import { NotificationsConfig } from "@/models/notificationsConfig";

interface NotificationSettingData {
  id: string;
  email: boolean;
  push: boolean;
}

export default (Vue as VueConstructor<Vue>).extend({
  name: "ConfigurationsDialog",

  components: {},

  props: { value: Boolean },

  mixins: [],

  data: () => ({
    isButtonLoading: false,
    notifications: {
      NEW_POST: {
        id: "",
        email: false,
        push: false
      },
      NEW_COMMENT: {
        id: "",
        email: false,
        push: false
      },
      NEW_MENTION: {
        id: "",
        email: false,
        push: false
      },
      NEW_FOLLOWER: {
        id: "",
        email: false,
        push: false
      },
      CONTACT_REQUEST: {
        id: "",
        email: false,
        push: false
      },
      CONTACT_ACCEPTED: {
        id: "",
        email: false,
        push: false
      }
    } as Record<NotificationType, NotificationSettingData>
  }),

  methods: {
    async getUserNotificationSettings() {
      const result = await getUserNotificationsConfig();
      result.forEach((setting) => {
        if (this.notifications[setting.type]) {
          this.notifications[setting.type].email = setting.email;
          this.notifications[setting.type].push = setting.push;
          if (setting.id) {
            this.notifications[setting.type].id = setting.id;
          }
        }
      });
      console.log(this.notifications);
    },

    async changeNotificationSettings() {
      const settingsToSend = Object.entries(this.notifications).map((setting) => {
        return {
          id: setting[1].id,
          data: {
            type: setting[0],
            email: setting[1].email,
            push: setting[1].push
          }
        };
      });
      this.isButtonLoading = true;
      await Promise.all(
        settingsToSend.map((setting) => {
          return putChangeNotifications({
            id: setting.id,
            type: setting.data.type,
            email: setting.data.email,
            push: setting.data.push
          } as NotificationsConfig);
        })
      );
      this.isButtonLoading = false;
    },

    close() {
      this.$emit("input");
    }
  },

  created() {
    this.getUserNotificationSettings();
  }
});
</script>

<style lang="scss" scoped></style>
