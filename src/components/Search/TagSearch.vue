<template>
  <v-list-item>
    <v-list-item-icon class="mr-2"> <v-icon size="20">mdi-pound</v-icon> </v-list-item-icon>

    <v-list-item-content>
      <v-list-item-title>
        <span
          class="font-weight-bold text--secondary text-capitalize txt"
          @click="$router.push(`/?tag=${tag.canonicalName}`)"
        >
          {{ tag.name }}
        </span>

        <span class="font-weight-light caption">
          <v-icon color="#737373" size="25">mdi-circle-small</v-icon> {{ tag.followerQuantity }}
          {{ $i18n.t("Onboarding.Tag.cardText") }}
        </span>
      </v-list-item-title>
    </v-list-item-content>

    <v-list-item-action>
      <v-btn
        block
        color="error"
        small
        @click="followUnfollowTag"
        outlined
        v-if="tag.isFollowing"
        :loading="isLoading"
        width="100"
        >{{ $i18n.t("unfollow") }}
      </v-btn>

      <v-btn
        block
        color="primary"
        small
        @click="followUnfollowTag"
        outlined
        v-if="!tag.isFollowing"
        :loading="isLoading"
        width="100"
        >{{ $i18n.t("Onboarding.Tag.follow") }}
      </v-btn>
    </v-list-item-action>
  </v-list-item>
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

<style scoped>
.txt:hover {
  text-decoration: underline;
  cursor: pointer;
}
</style>
