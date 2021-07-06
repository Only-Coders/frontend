<template>
  <div>
    <v-row no-gutters style="width: 400px">
      <v-col cols="10">
        <v-icon size="20" class="mr-2">mdi-pound</v-icon>
        <span class="font-weight-bold text--secondary text-capitalize"
          >{{ canonicalName }} <v-icon color="#737373" size="25">mdi-circle-small</v-icon> {{ followerQuantity }}
          {{ $i18n.t("Onboarding.Tag.cardText") }}</span
        >
      </v-col>

      <v-col cols="2">
        <v-btn block color="error" small @click.stop="createDialog = true" outlined v-if="isFollowed">{{
          $i18n.t("unfollow")
        }}</v-btn>
        <v-btn block color="primary" small @click="followTag" outlined v-if="!isFollowed">{{
          $i18n.t("Onboarding.Tag.follow")
        }}</v-btn>
      </v-col>
    </v-row>

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
import UnfollowTagDialog from "@/components/UnfollowTagDialog.vue";
import { post } from "@/services/tag";

export default Vue.extend({
  name: "TagSearch",

  components: { UnfollowTagDialog },

  props: { canonicalName: String, followerQuantity: Number, isFollowed: Boolean },

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

<style scoped></style>
