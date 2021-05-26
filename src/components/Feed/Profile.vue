<template>
  <v-row justify="center">
    <v-card width="250">
      <div class="profile__banner">
        <v-avatar size="90" class="profile__banner__avatar">
          <v-img alt="user" :src="userData.imageURI" />
        </v-avatar>
      </div>
      <v-row class="pt-14" justify="center">
        <h2 class="pt-4 font-weight-regular">
          {{ userData.firstName }}
          {{ userData.lastName }}
        </h2>
      </v-row>
      <v-row justify="center">
        <h4>
          <h4 class="center subtitle-1 text--secondary">
            {{ userData.currentPosition ? userData.currentPosition.position : "" }}
          </h4>
        </h4>
      </v-row>
      <v-row justify="center" class="mt-8">
        <v-col cols="2" class="px-0 pl-6">
          <v-row>
            <v-col class="pa-0">
              <v-img alt="user" width="20" src="@/assets/images/gold-medal.png" />
            </v-col>
            <v-col class="pa-0">
              <h5 class="pa-0 font-weight-light">{{ medals.gold }}</h5>
            </v-col>
          </v-row>
        </v-col>
        <v-col cols="2" class="px-0 pl-6">
          <v-row>
            <v-col class="pa-0">
              <v-img alt="user" width="20" src="@/assets/images/silver-medal.png" />
            </v-col>
            <v-col class="pa-0">
              <h5 class="pa-0 font-weight-light">{{ medals.silver }}</h5>
            </v-col>
          </v-row>
        </v-col>
        <v-col cols="2" class="px-0 pl-6">
          <v-row>
            <v-col class="pa-0">
              <v-img alt="user" width="20" src="@/assets/images/bronce-medal.png" />
            </v-col>
            <v-col class="pa-0">
              <h5 class="pa-0 font-weight-light">{{ medals.bronce }}</h5>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
      <v-row justify="center">
        <v-card-title class="pb-2">{{ userData.postQty }}</v-card-title>
      </v-row>
      <p class="pt-0" align="center">{{ $i18n.t("Feed.posts") }}</p>
      <v-row justify="center">
        <v-col cols="6" class="pl-6">
          <v-row justify="center">
            <v-card-title class="pb-2">{{ userData.followerQty }}</v-card-title>
          </v-row>
          <p class="pt-0" align="center">{{ $i18n.t("Feed.followers") }}</p>
        </v-col>
        <v-col cols="6" class="pr-6">
          <v-row justify="center">
            <v-card-title class="pb-2">{{ userData.contactQty }}</v-card-title>
          </v-row>
          <p class="pt-0" align="center">{{ $i18n.t("Feed.contacts") }}</p>
        </v-col>
      </v-row>
      <v-row justify="center" class="pb-2">
        <v-btn text color="secondary" class="v-btn__content">{{ $i18n.t("Feed.viewProfile") }} </v-btn>
      </v-row>
    </v-card>
  </v-row>
</template>

<script lang="ts">
import Vue from "vue";
import { Profile } from "@/models/profile";
import { Medals } from "@/models/medals";
import { get } from "@/services/user";

export default Vue.extend({
  name: "Profile",

  data: () => ({
    userData: {} as Profile,
    medals: {} as Medals
  }),

  methods: {
    async getUserProfile() {
      this.userData = await get(this.$store.state.userModule.user.canonicalName);
    },

    calculateMedals(approves: number): Medals {
      const bronce = approves % 100;
      approves = (approves - bronce) / 100;
      const silver = approves % 100;
      const gold = (approves - silver) / 100;
      return { gold, silver, bronce };
    }
  },

  async created() {
    await this.getUserProfile();
    this.medals = this.calculateMedals(this.userData.medalQty);
  }
});
</script>

<style lang="scss" scoped>
.profile__banner {
  position: relative;
  background: #00cdae;
  height: 70px;
  display: flex;
  justify-content: center;
}
.profile__banner__avatar {
  position: absolute;
  top: 30px;
}
.v-btn__content {
  text-transform: lowercase !important;
  font-weight: bold !important;
  font-size: 16px !important;
}
</style>
