<template>
  <v-row no-gutters class="mt-6">
    <v-col cols="12" md="6 offset-1" lg="3 offset-1" class="px-10">
      <ProfilePreview :userData="userData" :isSelfProfile="isSelfProfile"></ProfilePreview>
      <ReceivedContactRequests
        class="mt-8"
        @hideContactsRequests="showContactsRequests = false"
        v-if="isSelfProfile && showContactsRequests"
        @incrementContacts="incrementContacts"
      ></ReceivedContactRequests>
    </v-col>
    <v-col cols="12" md="7">
      <ProfileTabs
        class="mx-7"
        :isSelfProfile="isSelfProfile"
        @decrementContact="decrementContacts"
        :userCanonicalName="userData"
      ></ProfileTabs>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import Vue from "vue";
import ProfilePreview from "@/components/Profile/ProfilePreview.vue";
import ProfileTabs from "@/components/Profile/Tabs/ProfileTabs.vue";
import ReceivedContactRequests from "@/components/Profile/ReceivedContactRequests.vue";
import { getUserByCanonicalName } from "@/services/user";
import { Profile } from "@/models/profile";

export default Vue.extend({
  name: "Profile",

  components: { ProfilePreview, ProfileTabs, ReceivedContactRequests },

  data: () => ({
    userData: {} as Profile,
    showContactsRequests: true,
    isSelfProfile: false
  }),

  methods: {
    incrementContacts() {
      this.userData.contactQty++;
    },
    decrementContacts() {
      this.userData.contactQty--;
    }
  },

  async created() {
    this.isSelfProfile = this.$route.params.user == this.$store.state.userModule.user.canonicalName;
    this.userData = await getUserByCanonicalName(this.$route.params.user);
  }
});
</script>

<style scoped></style>
