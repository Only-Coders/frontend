<template>
  <v-card class="py-1">
    <v-btn class="btn_cross mr-2 mt-1" absolute icon small @click="closeSuggestedContact">
      <v-icon size="20"> mdi-close </v-icon>
    </v-btn>
    <v-row align="center" no-gutters class="mt-3 mb-2">
      <v-col cols="3" sm="2">
        <v-avatar size="70">
          <v-img alt="user" :src="imageURI ? imageURI : require('@/assets/images/default-avatar.png')" />
        </v-avatar>
      </v-col>

      <v-col class="align-start mr-10" cols="7" sm="5">
        <v-card-title class="pb-1 pl-0"> {{ firstName }} {{ lastName }} </v-card-title>
        <v-card-text class="text-start pl-0">
          {{ currentPosition != null ? currentPosition.workplace.name + " | " : "" }}
          {{ currentPosition != null ? currentPosition.position : "" }}
        </v-card-text>
      </v-col>

      <v-col cols="12" sm="4" class="mt-sm-0 mt-4">
        <v-btn v-if="!followed" color="primary" width="45%" small @click="followUser" outlined>
          {{ $i18n.t("Onboarding.SuggestedContacts.follow") }}
        </v-btn>
        <v-btn v-else color="primary" width="45%" small @click="followUser" outlined>
          {{ $i18n.t("Onboarding.SuggestedContacts.unfollow") }}
        </v-btn>

        <v-btn
          v-if="!contactRequestSended"
          color="primary"
          width="35%"
          class="mx-3"
          small
          depressed
          @click="sendContactRequest"
        >
          {{ $i18n.t("Onboarding.SuggestedContacts.add") }}
        </v-btn>

        <v-btn v-else color="primary" width="35%" class="mx-3" small depressed @click="sendContactRequest">
          {{ $i18n.t("Onboarding.SuggestedContacts.cancelAdd") }}
        </v-btn>
      </v-col>
    </v-row>
  </v-card>
</template>

<script lang="ts">
import Vue, { PropType } from "vue";
import { postContactRequest, deleteContactRequest } from "@/services/contact";
import { postFollow, deleteFollow } from "@/services/follow";
import { CurrentPosition } from "@/models/currentPosition";

export default Vue.extend({
  name: "Contact",

  props: {
    firstName: String,
    lastName: String,
    imageURI: String,
    canonicalName: String,
    currentPosition: Object as PropType<CurrentPosition>
  },

  data: () => ({
    contactRequestSended: false,
    followed: false
  }),

  methods: {
    followUser() {
      if (this.followed) {
        deleteFollow(this.canonicalName);
      } else {
        postFollow(this.canonicalName);
      }
      this.followed = !this.followed;
    },
    sendContactRequest() {
      if (this.contactRequestSended) {
        deleteContactRequest(this.canonicalName);
      } else {
        postContactRequest({ canonicalName: this.canonicalName });
      }
      this.contactRequestSended = !this.contactRequestSended;
    },
    closeSuggestedContact() {
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

.btn_cross {
  right: 0;
  top: 0;
}
</style>
