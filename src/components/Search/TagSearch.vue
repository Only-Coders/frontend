<template>
  <div>
    <v-row no-gutters style="width: 500px">
      <v-col cols="10">
        <v-icon size="20" class="mr-2">mdi-pound</v-icon>
        <span class="font-weight-bold text--secondary text-capitalize">
          {{ tag.name }}
        </span>

        <span class="font-weight-light text--secondary">
          <v-icon color="#737373" size="25">mdi-circle-small</v-icon> {{ tag.followerQuantity }}
          {{ $i18n.t("Onboarding.Tag.cardText") }}
        </span>
      </v-col>

      <v-col cols="2">
        <v-btn
          block
          color="error"
          small
          @click="followUnfollowTag"
          outlined
          v-if="tag.isFollowing"
          :loading="isLoading"
          >{{ $i18n.t("unfollow") }}</v-btn
        >
        <v-btn
          block
          color="primary"
          small
          @click="followUnfollowTag"
          outlined
          v-if="!tag.isFollowing"
          :loading="isLoading"
          >{{ $i18n.t("Onboarding.Tag.follow") }}</v-btn
        >
      </v-col>
    </v-row>
  </div>
</template>

<script lang="ts">
import Vue, { PropType } from "vue";
import { post, unfollowTag } from "@/services/tag";
import { Tag } from "@/models/tag";

export default Vue.extend({
  name: "TagSearch",

  props: { tag: {} as PropType<Tag> },

  data: () => ({
    createDialog: false,
    isLoading: false
  }),

  methods: {
    async followUnfollowTag() {
      this.isLoading = true;
      if (!this.tag.isFollowing) {
        await post(this.tag.canonicalName);
        this.tag.followerQuantity++;
      } else {
        await unfollowTag(this.tag.canonicalName);
        this.tag.followerQuantity--;
      }
      this.tag.isFollowing = !this.tag.isFollowing;
      this.isLoading = false;
    }
  }
});
</script>

<style scoped></style>
