<template>
  <v-card>
    <div class="profile__banner">
      <v-avatar size="90" class="profile__banner__avatar">
        <v-img
          alt="user"
          :src="userData.imageURI ? userData.imageURI : require('@/assets/images/default-avatar.png')"
        />
      </v-avatar>
    </div>

    <h2 class="pt-15 font-weight-regular text-center">
      {{ userData.firstName }}
      {{ userData.lastName }}
    </h2>

    <h4 class="center subtitle-1 text--secondary text-center">
      {{ userData.currentPosition ? userData.currentPosition.position : "" }}
    </h4>

    <v-row justify="center" class="mt-5" no-gutters>
      <v-col class="d-flex justify-center">
        <div class="pl-2">
          <v-img alt="gold-medal" width="20" src="@/assets/images/gold-medal.png" />
        </div>

        <span class="font-weight-light pr-3 pl-1 text-caption">{{ medals.gold }}</span>

        <div>
          <v-img alt="silver-medal" width="20" src="@/assets/images/silver-medal.png" />
        </div>
        <span class="font-weight-light pr-3 pl-1 text-caption">{{ medals.silver }}</span>

        <div>
          <v-img alt="bronce-medal" width="20" src="@/assets/images/bronce-medal.png" />
        </div>
        <span class="font-weight-light pl-1 text-caption">{{ medals.bronce }}</span>
      </v-col>
    </v-row>

    <v-card-title class="py-1 justify-center mt-6">{{ userData.postQty }}</v-card-title>
    <p class="pt-0" align="center">{{ $i18n.t("Feed.posts") }}</p>

    <v-row justify="center" class="mb-1" no-gutters>
      <v-col cols="6">
        <v-card-title class="py-1 justify-center">{{ userData.followerQty }}</v-card-title>

        <p class="pt-0" align="center">{{ $i18n.t("Feed.followers") }}</p>
      </v-col>
      <v-col cols="6">
        <v-card-title class="py-1 justify-center">{{ userData.contactQty }}</v-card-title>

        <p class="pt-0" align="center">{{ $i18n.t("Feed.contacts") }}</p>
      </v-col>
    </v-row>

    <v-btn text color="secondary" block class="text-caption" @click="$router.push('profile/' + userData.canonicalName)"
      >{{ $i18n.t("Feed.viewProfile") }}
    </v-btn>
  </v-card>
</template>

<script lang="ts">
import Vue from "vue";
import { Profile } from "@/models/profile";
import { Medals } from "@/models/medals";
import { getUserByCanonicalName } from "@/services/user";

export default Vue.extend({
  name: "FeedProfilePreview",

  data: () => ({
    userData: {} as Profile,
    medals: {} as Medals
  }),

  methods: {
    async getUserProfile() {
      this.userData = await getUserByCanonicalName(this.$store.state.userModule.user.canonicalName);
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
