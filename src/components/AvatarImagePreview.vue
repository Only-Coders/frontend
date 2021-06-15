<template>
  <div>
    <v-avatar :size="imageSize" :class="canonicalName ? 'grow' : ''" @click="redirectToProfile">
      <v-skeleton-loader :loading="true" type="avatar" class="skeleton"> </v-skeleton-loader>

      <v-img class="profile_image" alt="user" :src="src" />
    </v-avatar>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "AvatarImagePreview",

  props: { src: String, imageSize: Number, canonicalName: String },

  methods: {
    redirectToProfile() {
      if (this.canonicalName) {
        this.$router.push(this.canonicalName);
      }
    }
  }
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
  width: 160px !important;
  height: 160px !important;
  z-index: 5;
}
.profile_image {
  z-index: 9 !important;
}
.grow {
  transition: all 0.1s ease-in-out;
}
.grow:hover {
  cursor: pointer;
  transform: scale(1.1);
}
</style>
