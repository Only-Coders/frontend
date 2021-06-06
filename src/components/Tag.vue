<template>
  <div>
    <v-card class="mb-2 py-1" max-height="96">
      <v-row no-gutters align="center">
        <v-col class="pl-6 align-start">
          <v-card-title class="pb-1"> {{ canonicalName }} </v-card-title>
          <v-card-text class="text-start">{{ followerQuantity }} {{ $i18n.t("Onboarding.Tag.cardText") }}</v-card-text>
        </v-col>
        <v-col cols="2" class="mr-8" no-gutters>
          <v-btn
            block
            color="error"
            small
            @click.stop="createDialog = true"
            outlined
            v-if="isFollowed && isSelfProfile"
            >{{ $i18n.t("unfollow") }}</v-btn
          >
          <v-btn block color="primary" small @click="followTag" outlined v-if="!isFollowed">{{
            $i18n.t("Onboarding.Tag.follow")
          }}</v-btn>
        </v-col>
      </v-row>
    </v-card>

    <UnfollowTagDialog
      :canonicalName="canonicalName"
      v-if="createDialog"
      v-model="createDialog"
      @unfollowTag="$emit('unfollowTag')"
      :isFollow="true"
    ></UnfollowTagDialog>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { post } from "@/services/tag";
import UnfollowTagDialog from "@/components/UnfollowTagDialog.vue";

export default Vue.extend({
  name: "TagItem",

  components: { UnfollowTagDialog },

  props: { canonicalName: String, followerQuantity: Number, isFollowed: Boolean, isSelfProfile: Boolean },

  data: () => ({
    createDialog: false
  }),

  methods: {
    followTag() {
      post(this.canonicalName);
      this.$emit("remove");
    }
  }
});
</script>

<style scoped>
.v-card.v-sheet.theme--light {
  background-color: #ffffff !important;
  border-left: 5px solid var(--v-secondary-base) !important;
}
</style>
