<template>
  <div>
    <v-dialog :value="value" @input="close" transition="dialog-top-transition" width="670px" height="700px">
      <v-card max-width="670px" max-height="700px">
        <v-toolbar color="primary" dark>
          <h2 class="ml-4">{{ $i18n.t("Settings.settingsTitle") }}</h2>
          <v-spacer></v-spacer>
          <v-btn class="mt-1 mr-2" icon @click="close">
            <v-icon size="20"> mdi-close </v-icon>
          </v-btn>
        </v-toolbar>
        <v-tabs vertical>
          <v-tab>{{ $i18n.t("Settings.notificationsTitle") }}</v-tab>

          <v-tab-item class="mx-10">
            <div>
              <v-card-title class="pl-0 font-weight-regular">{{ $i18n.t("Settings.newPostTitle") }}</v-card-title>
              <v-card-subtitle class="pa-0">{{ $i18n.t("Settings.newPostText") }}</v-card-subtitle>
              <v-row no-gutters class="align-center">
                <v-col cols="auto">
                  <v-checkbox v-model="notifications.NEW_POST.email"></v-checkbox>
                </v-col>
                <v-col cols="auto" class="pl-0">
                  <h4 class="ma-0 font-weight-light">{{ $i18n.t("Settings.email") }}</h4>
                </v-col>
                <v-col cols="auto" class="ml-4">
                  <v-checkbox v-model="notifications.NEW_POST.push"></v-checkbox>
                </v-col>
                <v-col cols="auto" class="pl-0">
                  <h4 class="ma-0 font-weight-light">{{ $i18n.t("Settings.push") }}</h4>
                </v-col>
              </v-row>
            </div>
            <div>
              <v-card-title class="pl-0 font-weight-regular">{{ $i18n.t("Settings.newCommentsTitle") }}</v-card-title>
              <v-card-subtitle class="pa-0">{{ $i18n.t("Settings.newCommentsText") }}</v-card-subtitle>
              <v-row no-gutters class="align-center">
                <v-col cols="auto">
                  <v-checkbox v-model="notifications.NEW_COMMENT.email"></v-checkbox>
                </v-col>
                <v-col cols="auto" class="pl-0">
                  <h4 class="ma-0 font-weight-light">{{ $i18n.t("Settings.email") }}</h4>
                </v-col>
                <v-col cols="auto" class="ml-4">
                  <v-checkbox v-model="notifications.NEW_COMMENT.push"></v-checkbox>
                </v-col>
                <v-col cols="auto" class="pl-0">
                  <h4 class="ma-0 font-weight-light">{{ $i18n.t("Settings.push") }}</h4>
                </v-col>
              </v-row>
            </div>
            <div>
              <v-card-title class="pl-0 font-weight-regular">{{ $i18n.t("Settings.newMentionsTitle") }}</v-card-title>
              <v-card-subtitle class="pa-0">{{ $i18n.t("Settings.newMentionsText") }}</v-card-subtitle>
              <v-row no-gutters class="align-center">
                <v-col cols="auto">
                  <v-checkbox v-model="notifications.NEW_MENTION.email"></v-checkbox>
                </v-col>
                <v-col cols="auto" class="pl-0">
                  <h4 class="ma-0 font-weight-light">{{ $i18n.t("Settings.email") }}</h4>
                </v-col>
                <v-col cols="auto" class="ml-4">
                  <v-checkbox v-model="notifications.NEW_MENTION.push"></v-checkbox>
                </v-col>
                <v-col cols="auto" class="pl-0">
                  <h4 class="ma-0 font-weight-light">{{ $i18n.t("Settings.push") }}</h4>
                </v-col>
              </v-row>
            </div>
            <div>
              <v-card-title class="pl-0 font-weight-regular">{{
                $i18n.t("Settings.newContactRequestTitle")
              }}</v-card-title>
              <v-card-subtitle class="pa-0">{{ $i18n.t("Settings.newContactRequestText") }}</v-card-subtitle>
              <v-row no-gutters class="align-center">
                <v-col cols="auto">
                  <v-checkbox v-model="notifications.CONTACT_REQUEST.email"></v-checkbox>
                </v-col>
                <v-col cols="auto" class="pl-0">
                  <h4 class="ma-0 font-weight-light">{{ $i18n.t("Settings.email") }}</h4>
                </v-col>
                <v-col cols="auto" class="ml-4">
                  <v-checkbox v-model="notifications.CONTACT_REQUEST.push"></v-checkbox>
                </v-col>
                <v-col cols="auto" class="pl-0">
                  <h4 class="ma-0 font-weight-light">{{ $i18n.t("Settings.push") }}</h4>
                </v-col>
              </v-row>
            </div>
            <div>
              <v-card-title class="pl-0 font-weight-regular">{{ $i18n.t("Settings.newFollowerTitle") }}</v-card-title>
              <v-card-subtitle class="pa-0">{{ $i18n.t("Settings.newFollowerText") }}</v-card-subtitle>
              <v-row no-gutters class="align-center">
                <v-col cols="auto">
                  <v-checkbox v-model="notifications.NEW_FOLLOWER.email"></v-checkbox>
                </v-col>
                <v-col cols="auto" class="pl-0">
                  <h4 class="ma-0 font-weight-light">{{ $i18n.t("Settings.email") }}</h4>
                </v-col>
                <v-col cols="auto" class="ml-4">
                  <v-checkbox v-model="notifications.NEW_FOLLOWER.push"></v-checkbox>
                </v-col>
                <v-col cols="auto" class="pl-0">
                  <h4 class="ma-0 font-weight-light">{{ $i18n.t("Settings.push") }}</h4>
                </v-col>
              </v-row>
            </div>
            <div>
              <v-card-title class="pl-0 font-weight-regular">{{
                $i18n.t("Settings.newContactAcceptedTitle")
              }}</v-card-title>
              <v-card-subtitle class="pa-0">{{ $i18n.t("Settings.newContactAcceptedText") }}</v-card-subtitle>
              <v-row no-gutters class="align-center">
                <v-col cols="auto">
                  <v-checkbox v-model="notifications.CONTACT_ACCEPTED.email"></v-checkbox>
                </v-col>
                <v-col cols="auto" class="pl-0">
                  <h4 class="ma-0 font-weight-light">{{ $i18n.t("Settings.email") }}</h4>
                </v-col>
                <v-col cols="auto" class="ml-4">
                  <v-checkbox v-model="notifications.CONTACT_ACCEPTED.push"></v-checkbox>
                </v-col>
                <v-col cols="auto" class="pl-0">
                  <h4 class="ma-0 font-weight-light">{{ $i18n.t("Settings.push") }}</h4>
                </v-col>
              </v-row>
            </div>
            <v-row no-gutters class="d-flex justify-end pt-8 pb-4">
              <v-col cols="auto">
                <v-btn color="primary" small @click="changeNotificationSettings" :loading="isButtonLoading">
                  {{ $i18n.t("Settings.confirm") }}
                </v-btn>
              </v-col>
            </v-row>
          </v-tab-item>

          <v-tab>{{ $i18n.t("Settings.accountTitle") }}</v-tab>
          <v-tab-item class="mx-10 mt-5 mb-10">
            <div v-if="!eliminationDate">
              <span class="font-weight-bold">
                {{ $i18n.t("Settings.deleteMessage") }}
              </span>

              <span>{{ $i18n.t("Settings.deleteMessage2") }}</span>
              <p>{{ $i18n.t("Settings.deleteMessage3") }}</p>

              <v-row class="mt-10" justify="center">
                <v-btn color="error" small @click="showDeleteAccountDialog = true">
                  {{ $i18n.t("Settings.deleteAccount") }}
                </v-btn>
              </v-row>
            </div>

            <div v-else>
              <p>{{ $i18n.t("Settings.cancelEliminationAccount") }} {{ eliminationDate }}</p>
              <p>{{ $i18n.t("Settings.cancelEliminationAccount2") }}</p>

              <v-row class="mt-10" justify="center">
                <v-btn color="primary" small @click="cancelAccountElimination">
                  {{ $i18n.t("Settings.cancelElimination") }}
                </v-btn>
              </v-row>
            </div>
          </v-tab-item>

          <v-tab>{{ $i18n.t("Settings.languageTitle") }}</v-tab>
          <v-tab-item class="mx-10 mt-5 mb-10">
            <v-select
              v-model="languageOptionSelected"
              :items="languageOptions"
              item-value="value"
              item-text="text"
              @change="changeLanguage"
              hide-details
              hide-no-data
              flat
              solo
              height="48"
              background-color="grey_input"
              :label="$i18n.t('orderBy')"
              width="35%"
              class="mx-2"
            ></v-select>
          </v-tab-item>
        </v-tabs>
      </v-card>
    </v-dialog>

    <DeleteAccountDialog
      v-if="showDeleteAccountDialog"
      v-model="showDeleteAccountDialog"
      :inEliminationProcess="$store.state.userModule.user.eliminationDate"
    ></DeleteAccountDialog>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { VueConstructor } from "vue/types/umd";
import { NotificationType } from "@/models/Enums/notificationType";
import { getUserNotificationsConfig, putChangeNotifications } from "@/services/notifications";
import DeleteAccountDialog from "@/components/DeleteAccountDialog.vue";
import { cancelAccountElimination } from "@/services/account";
import { format } from "date-fns";
import notificationsMixin, { NotificationMixin } from "@/mixins/notifications";
import { i18n } from "@/main";
import { setLanguage } from "@/services/language";
import { Language } from "@/models/language";

interface NotificationSettingData {
  id: string;
  email: boolean;
  push: boolean;
}

type LanguageOptions = {
  value: string;
  text: string;
};

export default (Vue as VueConstructor<Vue & NotificationMixin>).extend({
  name: "ConfigurationsDialog",

  components: { DeleteAccountDialog },

  props: { value: Boolean },

  mixins: [notificationsMixin],

  data: () => ({
    isButtonLoading: false,
    originalState: {
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
    } as Record<NotificationType, NotificationSettingData>,
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
    } as Record<NotificationType, NotificationSettingData>,
    showDeleteAccountDialog: false,
    accountInEliminationProcess: Date,
    languageOptions: [
      { value: "es", text: i18n.t("Language.es").toString() },
      { value: "en", text: i18n.t("Language.en").toString() }
    ] as LanguageOptions[]
  }),

  methods: {
    async getUserNotificationSettings() {
      const result = await getUserNotificationsConfig();
      result.forEach((setting) => {
        this.notifications[setting.type].email = setting.email;
        this.notifications[setting.type].push = setting.push;
        this.notifications[setting.type].id = setting.id;

        this.originalState[setting.type].email = setting.email;
        this.originalState[setting.type].push = setting.push;
        this.originalState[setting.type].id = setting.id;
      });
    },

    async changeNotificationSettings() {
      this.isButtonLoading = true;
      const settingsToSend = Object.entries(this.notifications)
        .filter((setting) => {
          const type = setting[0] as NotificationType;
          return (
            this.originalState[type].push !== this.notifications[type].push ||
            this.originalState[type].email !== this.notifications[type].email
          );
        })
        .map((setting) => {
          const type = setting[0] as NotificationType;
          const newConfig = {
            id: setting[1].id,
            push: setting[1].push,
            email: setting[1].email,
            type: setting[0] as NotificationType
          };
          this.originalState[type] = newConfig;
          return putChangeNotifications(newConfig);
        });
      await Promise.all(settingsToSend);
      this.isButtonLoading = false;
    },

    close() {
      this.$emit("input");
    },

    async cancelAccountElimination() {
      this.success("", this.$i18n.t("Feed.cancelEliminationToast").toString(), 3000);
      await cancelAccountElimination();
      this.$store.commit("userModule/SET_USER_ELIMINATION_DATE", null);
      this.close();
    },

    async changeLanguage() {
      this.$i18n.locale = this.languageOptionSelected;
      await setLanguage({ code: this.languageOptionSelected } as Language);

      this.languageOptions = [
        { value: "es", text: i18n.t("Language.es").toString() },
        { value: "en", text: i18n.t("Language.en").toString() }
      ] as LanguageOptions[];
    }
  },

  created() {
    this.getUserNotificationSettings();
  },

  computed: {
    eliminationDate: {
      get(): string | null {
        return this.$store.state.userModule.user.eliminationDate
          ? format(new Date(this.$store.state.userModule.user.eliminationDate), "dd/MM/yyyy")
          : null;
      }
    },
    languageOptionSelected: {
      get(): string {
        return this.$store.state.userModule.user.language;
      },
      set(language: string) {
        this.$store.commit("userModule/SET_USER_LANGUAGE", language);
      }
    }
  }
});
</script>

<style lang="scss" scoped></style>
