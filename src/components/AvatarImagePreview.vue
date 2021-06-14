<template>
  <div>
    <v-avatar :size="imageSize">
      <v-skeleton-loader :loading="true" type="avatar" class="skeleton"> </v-skeleton-loader>

      <v-img class="profile_image" alt="user" :src="src" />
    </v-avatar>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "AvatarImagePreview",

  props: { src: String, imageSize: Number }
});
</script>

<style scoped>
.skeleton {
  position: absolute;
  z-index: 4;
}
</style>

<style>
.skeleton .v-skeleton-loader__avatar {
  width: 90px !important;
  height: 90px !important;
  z-index: 5;
}
.profile_image {
  z-index: 9 !important;
}
</style>
