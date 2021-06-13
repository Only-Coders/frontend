<template>
  <v-row no-gutters class="mt-6" justify-sm="center" justify-lg="start">
    <v-col cols="12" lg="4" class="px-7 px-md-16 px-lg-0 mb-10 mb-lg-0">
      <ProfilePreview
        :userData="userData"
        :isSelfProfile="isSelfProfile"
        :loading="loading"
        :class="{ profile_preview_col: $vuetify.breakpoint.lgAndUp }"
      ></ProfilePreview>
      <ReceivedContactRequests
        class="mt-8"
        @hideContactsRequests="showContactsRequests = false"
        v-if="isSelfProfile && showContactsRequests"
        @incrementContacts="incrementContacts"
      ></ReceivedContactRequests>
    </v-col>
    <v-col cols="12" lg="7">
      <ProfileTabs
        class="mx-7"
        :isSelfProfile="isSelfProfile"
        @decrementContact="decrementContacts"
        :userCanonicalName="userData"
        :loading="loading"
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
    isSelfProfile: false,
    loading: true
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
    this.loading = false;
  }
});
</script>

<style scoped>
.profile_preview_col {
  padding-left: 160px !important;
  padding-right: 40px !important;
}
</style>
