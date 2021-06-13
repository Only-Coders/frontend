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

    <v-row v-if="userInfo.description" no-gutters class="mt-5">
      <span class="pl-sm-16 pr-7 ml-16">
        <v-icon size="28"> mdi-text-box </v-icon>
      </span>
      <p>{{ userInfo.description }}</p>
    </v-row>

    <v-row no-gutters class="mt-5">
      <span class="pl-sm-16 pr-7 ml-16">
        <v-icon size="28"> mdi-account-circle </v-icon>
      </span>
      <p>{{ userInfo.firstName + " " + userInfo.lastName }}</p>
    </v-row>

    <v-row no-gutters class="mt-5">
      <span class="pl-sm-16 pr-7 ml-16">
        <v-icon size="28"> mdi-email </v-icon>
      </span>
      <p>{{ userInfo.email }}</p>
    </v-row>

    <v-row no-gutters class="mt-5" v-if="userInfo.birthDate">
      <span class="pl-sm-16 pr-7 ml-16">
        <v-icon size="28"> mdi-calendar-month </v-icon>
      </span>
      <p>{{ birthDate }}</p>
    </v-row>

    <v-row no-gutters class="mt-5">
      <span class="pl-sm-16 pr-7 ml-16">
        <v-icon size="26"> mdi-map-marker-radius </v-icon>
      </span>
      <p>{{ userInfo.country.name }}</p>
    </v-row>

    <v-row no-gutters class="mt-5" align="center" v-if="userInfo.gitProfile">
      <div class="pl-sm-16 pr-7 ml-16">
        <v-img width="30" :src="srcImageGit"> </v-img>
      </div>
      <p class="ma-0">{{ userInfo.gitProfile.userName }}</p>
    </v-row>

    <EditDataDialog
      :userData="userInfo"
      v-if="createDialog"
      v-model="createDialog"
      @unfollowTag="$emit('unfollowTag')"
    ></EditDataDialog>
  </div>
</template>

<script lang="ts">
import Vue, { PropType } from "vue";
import { Profile } from "@/models/profile";
import { dateMixin } from "@/mixins/formattedDate";
import { format } from "date-fns";
import gitPlatform, { GitPlatformsMixin } from "@/mixins/gitPlatforms";
import { VueConstructor } from "vue/types/umd";
import EditDataDialog from "@/components/Profile/Tabs/DataTab/EditDataDialog.vue";

export default (Vue as VueConstructor<Vue & GitPlatformsMixin>).extend({
  name: "DataProfile",

  mixins: [dateMixin, gitPlatform],

  props: { userInfo: Object as PropType<Profile>, isLoguedUserProfile: Boolean },

  components: { EditDataDialog },

  data: () => ({
    birthDate: "",
    srcImageGit: "",
    createDialog: false
  }),

  created() {
    this.birthDate = format(new Date(this.userInfo.birthDate), "dd/MM/yyyy");

    switch (this.userInfo.gitProfile.platform) {
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
