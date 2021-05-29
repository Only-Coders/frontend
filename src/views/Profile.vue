<template>
  <v-row no-gutters class="mt-6">
    <v-col cols="3 offset-1" class="px-10">
      <ProfilePreview></ProfilePreview>
      <ReceivedContactRequests
        class="mt-8"
        @hideContactsRequests="showContactsRequests = false"
        v-if="showContactsRequests"
      ></ReceivedContactRequests>
    </v-col>
    <v-col cols="7">
      <ProfileTabs class="mx-7"></ProfileTabs>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import Vue from "vue";
import ProfilePreview from "@/components/Feed/ProfilePreview.vue";
import ProfileTabs from "@/components/Profile/Tabs/ProfileTabs.vue";
import ReceivedContactRequests from "@/components/Profile/ReceivedContactRequests.vue";

export default Vue.extend({
  name: "Profile",

  components: { ProfilePreview, ProfileTabs, ReceivedContactRequests },

  data: () => ({
    showContactsRequests: false
  })
});
</script>

<style scoped></style>
