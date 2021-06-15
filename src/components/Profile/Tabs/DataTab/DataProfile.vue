<template>
  <div>
    <v-row class="pb-3 px-sm-16 px-5" align="center" no-gutters>
      <span class="pl-10 pr-6">
        <v-icon size="30"> mdi-card-account-details </v-icon>
      </span>
      <h3>{{ $i18n.t("ViewProfile.personalData") }}</h3>
      <v-spacer></v-spacer>
      <v-btn
        class="mr-6"
        fab
        small
        depressed
        color="transparent"
        v-if="isLoguedUserProfile"
        @click.stop="createDialog = true"
      >
        <v-icon size="22" color="grey darken-1"> mdi-pencil </v-icon>
      </v-btn>
      <div class="divider-container mt-8">
        <v-divider></v-divider>
      </div>
    </v-row>

    <v-row v-if="userInfo.description" align="baseline" no-gutters class="px-sm-16 ml-sm-10 mb-6 mt-9">
      <v-col cols="1" class="pl-12 pr-8 px-sm-9 mr-2 mr-sm-6">
        <v-icon size="28"> mdi-text-box </v-icon>
      </v-col>
      <v-col cols="8" sm="9">
        <span>{{ userInfo.description }}</span>
      </v-col>
    </v-row>

    <v-row no-gutters align="center" class="px-sm-16 ml-sm-10 mb-6 mt-9">
      <v-col cols="1" class="pl-12 pr-8 px-sm-9 mr-2 mr-sm-6">
        <v-icon size="28"> mdi-account-circle </v-icon>
      </v-col>
      <v-col cols="8" sm="9">
        <span>{{ userInfo.firstName + " " + userInfo.lastName }}</span>
      </v-col>
    </v-row>

    <v-row no-gutters align="center" class="px-sm-16 ml-sm-10 mb-6 mt-9">
      <v-col cols="1" class="pl-12 pr-8 px-sm-9 mr-2 mr-sm-6">
        <v-icon size="28"> mdi-email </v-icon>
      </v-col>
      <v-col cols="8" sm="9">
        <span>{{ userInfo.email }}</span>
      </v-col>
    </v-row>

    <v-row no-gutters class="px-sm-16 ml-sm-10 mb-6 mt-10" v-if="birthDate">
      <v-col cols="1" class="pl-12 pr-8 px-sm-9 mr-2 mr-sm-6">
        <v-icon size="28"> mdi-calendar-month </v-icon>
      </v-col>
      <v-col cols="8" sm="9">
        <span>{{ birthDate }}</span>
      </v-col>
    </v-row>

    <v-row no-gutters align="center" class="px-sm-16 ml-sm-10 mb-6 mt-9" v-if="userInfo.country">
      <v-col cols="1" class="pl-12 pr-8 px-sm-9 mr-2 mr-sm-6">
        <v-icon size="26"> mdi-map-marker-radius </v-icon>
      </v-col>
      <v-col cols="8" sm="9">
        <span>{{ userInfo.country.name }}</span>
      </v-col>
    </v-row>

    <v-row no-gutters class="px-sm-16 ml-sm-10 mb-6 mt-10" align="center" v-if="userInfo.gitProfile">
      <v-col cols="1" class="pl-12 pr-8 px-sm-9 mr-2 mr-sm-6 d-flex align-center">
        <img width="25" height="25" alt="git platform" :src="srcImageGit" />
      </v-col>

      <v-col cols="8" sm="9">
        <a
          :href="'https://www.' + userInfo.gitProfile.platform + '.com/' + userInfo.gitProfile.userName"
          target="_blank"
          class="ma-0"
          >{{ userInfo.gitProfile.userName }}</a
        >
      </v-col>
    </v-row>

    <EditDataDialog
      :userData="userInfo"
      v-if="createDialog"
      v-model="createDialog"
      @unfollowTag="$emit('unfollowTag')"
      @updateData="updateUserData"
    ></EditDataDialog>
  </div>
</template>

<script lang="ts">
import Vue, { PropType } from "vue";
import { Profile } from "@/models/profile";
import dateMixin, { DateMixin } from "@/mixins/formattedDate";
import { format } from "date-fns";
import gitPlatform, { GitPlatformsMixin } from "@/mixins/gitPlatforms";
import { VueConstructor } from "vue/types/umd";
import EditDataDialog from "@/components/Profile/Tabs/DataTab/EditDataDialog.vue";

type GitProfile = {
  platform: "";
  userName: string;
};

export default (Vue as VueConstructor<Vue & GitPlatformsMixin & DateMixin>).extend({
  name: "DataProfile",

  mixins: [dateMixin, gitPlatform],

  props: { userInfo: Object as PropType<Profile>, isLoguedUserProfile: Boolean },

  components: { EditDataDialog },

  data: () => ({
    birthDate: "",
    srcImageGit: "",
    createDialog: false,
    gitProfile: {} as GitProfile
  }),

  methods: {
    updateUserData(userProfileUpdated: Profile) {
      this.userInfo.description = userProfileUpdated.description;
      this.birthDate = format(new Date(userProfileUpdated.birthDate), "dd/MM/yyyy");
      this.userInfo.birthDate = userProfileUpdated.birthDate;
      this.userInfo.firstName = userProfileUpdated.firstName;
      this.userInfo.lastName = userProfileUpdated.lastName;
      this.userInfo.country.name = userProfileUpdated.country.name;
      this.userInfo.country.code = userProfileUpdated.country.code;
      this.setGitPlatformImg(userProfileUpdated.gitProfile.platform);
      this.userInfo.gitProfile.platform = userProfileUpdated.gitProfile.platform;
      this.userInfo.gitProfile.userName = userProfileUpdated.gitProfile.userName;
    },

    setGitPlatformImg(gitPlatform: string) {
      switch (gitPlatform) {
        case this.gitPlatforms[0].platformName:
          this.srcImageGit = this.gitPlatforms[0].platformImage;
          break;

        case this.gitPlatforms[1].platformName:
          this.srcImageGit = this.gitPlatforms[1].platformImage;
          break;

        case this.gitPlatforms[2].platformName:
          this.srcImageGit = this.gitPlatforms[2].platformImage;
          break;

        default:
          break;
      }
    }
  },

  watch: {
    userInfo: {
      handler() {
        if (this.userInfo.birthDate) {
          console.log("En watch");
          this.birthDate = format(new Date(this.userInfo.birthDate), "dd/MM/yyyy");
        }
        if (this.userInfo.gitProfile) {
          this.setGitPlatformImg(this.userInfo.gitProfile.platform);
        }
      },
      deep: true,
      immediate: true
    }
  }
});
</script>

<style scoped>
.theme--light.v-divider {
  border-color: var(--v-secondary-base) !important;
}
.divider-container {
  width: 100%;
}
</style>
