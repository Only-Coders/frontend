<template>
  <v-card>
    <v-row align="center" no-gutters class="mb-3 mt-2 pt-3">
      <v-col cols="4" class="text-center">
        <AvatarImagePreview
          class="pb-0 user_name"
          @click="redirectToProfile"
          :src="imageURI"
          style="cursor: pointer"
          :imageSize="$vuetify.breakpoint.mdAndUp ? 60 : 55"
        ></AvatarImagePreview>
      </v-col>

      <v-col class="align-start justify-center" cols="8">
        <v-card-title class="pa-0 pr-2 user_data user_name" @click="$router.push(canonicalName)"
          >{{ firstName }} {{ lastName }}
        </v-card-title>
        <v-card-text class="text-start pa-0 pr-2">
          {{ currentPosition ? currentPosition.position + $i18n.t("at") : "" }}
          {{ currentPosition ? currentPosition.workplace.name : "" }}
        </v-card-text>
      </v-col>
    </v-row>

    <v-row no-gutters>
      <v-col cols="12 text-center" class="mb-2">
        <v-btn width="35%" class="mx-3" small depressed @click="rejectContactRequest">
          {{ $i18n.t("reject") }}
        </v-btn>

        <v-btn color="primary" width="35%" class="mx-3" small depressed @click="acceptContactRequest">
          {{ $i18n.t("accept") }}
        </v-btn>
      </v-col>
    </v-row>
  </v-card>
</template>

<script lang="ts">
import Vue, { PropType } from "vue";
import { postContactRequestResponse } from "@/services/receivedContactRequests";
import { CurrentPosition } from "@/models/currentPosition";
import { ContactRequestResponse } from "@/models/contactRequestResponse";
import AvatarImagePreview from "@/components/AvatarImagePreview.vue";

export default Vue.extend({
  name: "ContactRequest",

  components: { AvatarImagePreview },

  props: {
    firstName: String,
    lastName: String,
    imageURI: String,
    canonicalName: String,
    currentPosition: Object as PropType<CurrentPosition>
  },

  data: () => ({}),

  methods: {
    acceptContactRequest() {
      postContactRequestResponse({
        requesterCanonicalName: this.canonicalName,
        acceptContact: true
      } as ContactRequestResponse);
      this.removeContactRequest();
      this.$emit("incrementContacts");
    },
    rejectContactRequest() {
      postContactRequestResponse({
        requesterCanonicalName: this.canonicalName,
        acceptContact: false
      } as ContactRequestResponse);
      this.removeContactRequest();
    },
    removeContactRequest() {
      this.$emit("remove");
    },
    redirectToProfile() {
      const redirectTo = `/profile/${this.canonicalName}`;
      if (this.$router.currentRoute.path === redirectTo) {
        window.scroll({
          top: 0,
          left: 0,
          behavior: "smooth"
        });
      } else {
        this.$router.push(redirectTo);
      }
    }
  }
});
</script>

<style scoped>
.v-card.v-sheet.theme--light {
  background-color: #ffffff !important;
  border-left: 5px solid var(--v-secondary-base) !important;
}
.user_data {
  white-space: pre-wrap;
  word-break: break-word;
}
.user_name {
  cursor: pointer;
}
.user_name:hover {
  text-decoration: underline;
}
</style>
