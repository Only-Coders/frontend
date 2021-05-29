<template>
  <v-row no-gutters class="mt-6">
    <v-col cols="3 offset-1" class="px-10">
      <ProfilePreview></ProfilePreview>
    </v-col>
    <v-col cols="7">
      <ProfileTabs class="mx-7"></ProfileTabs>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import Vue from "vue";
import ProfilePreview from "@/components/Feed/ProfilePreview.vue";
import ProfileTabs from "@/components/Profile/ProfileTabs.vue";

export default Vue.extend({
  name: "Profile",

  components: { ProfilePreview, ProfileTabs },

  data: () => ({})
});
</script>

<style scoped></style>
