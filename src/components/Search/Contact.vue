<template>
  <v-card class="py-1">
    <v-row align="center" no-gutters class="mt-3 mb-2">
      <v-avatar size="70" class="ml-4">
        <v-img
          class="user__profile-image"
          alt="user"
          :src="contactData.imageURI ? contactData.imageURI : require('@/assets/images/default-avatar.png')"
          @click="redirectToProfile"
        />
      </v-avatar>

      <v-col class="align-start mr-8 pl-4" cols="9" sm="5">
        <v-row class="align-center justify-space-between" no-gutters>
          <div class="d-flex align-start">
            <v-col cols="auto" class="pa-0">
              <div style="user__name">
                <v-card-title
                  class="font-weight-regular pl-0 pr-2 py-0 user__name d-block text-truncate"
                  @click="redirectToProfile"
                  >{{ contactData.firstName }} {{ contactData.lastName }}</v-card-title
                >
              </div>
            </v-col>
            <v-col cols="auto" class="d-flex justify-start pa-0 pt-2">
              <div class="pl-0 pl-md-2">
                <v-img
                  alt="gold-medal"
                  :width="$vuetify.breakpoint.mdAndUp ? '20' : '15'"
                  src="@/assets/images/gold-medal.png"
                />
              </div>

              <span class="font-weight-light pr-1 pr-md-3 pl-1 text-caption">{{
                calculateMedals(contactData.medalQty).gold
              }}</span>

              <div class="my-auto">
                <v-img
                  alt="silver-medal"
                  :width="$vuetify.breakpoint.mdAndUp ? '20' : '15'"
                  src="@/assets/images/silver-medal.png"
                />
              </div>
              <span class="font-weight-light pr-1 pr-md-3 pl-1 text-caption">{{
                calculateMedals(contactData.medalQty).silver
              }}</span>

              <div class="my-auto">
                <v-img
                  alt="bronce-medal"
                  :width="$vuetify.breakpoint.mdAndUp ? '20' : '15'"
                  src="@/assets/images/bronce-medal.png"
                />
              </div>
              <span class="font-weight-light pl-1 text-caption">{{
                calculateMedals(contactData.medalQty).bronce
              }}</span>
            </v-col>
          </div>
          <v-card-subtitle class="pb-0 pt-1 pl-0"
            >{{ contactData.currentPosition ? contactData.currentPosition.position : "" }}
            {{ contactData.currentPosition ? $i18n.t("Feed.onPlace") : "" }}
            {{
              contactData.currentPosition && contactData.currentPosition.workplace
                ? contactData.currentPosition.workplace.name
                : ""
            }}
          </v-card-subtitle>
        </v-row>
      </v-col>

      <v-col
        v-if="contactData.canonicalName !== this.$store.state.userModule.user.canonicalName"
        cols="3"
        sm="4"
        class="mt-sm-0 mt-4 ml-8 d-flex justify-end"
      >
        <v-btn
          height="35"
          width="65%"
          color="#ee5e5e"
          class="mx-auto"
          v-if="isContactConnected"
          depressed
          dark
          small
          @click.stop="showDeleteDialog = true"
        >
          {{ $i18n.t("delete") }}
        </v-btn>

        <v-btn
          v-if="contactData.following && !contactData.connected"
          color="primary"
          height="35"
          width="35%"
          class="mx-4"
          small
          @click="followUser"
          outlined
        >
          {{ $i18n.t("Onboarding.SuggestedContacts.unfollow") }}
        </v-btn>

        <v-btn
          v-if="!contactData.following && !contactData.connected"
          color="primary"
          height="35"
          width="35%"
          class="mx-4"
          small
          @click="followUser"
          outlined
        >
          {{ $i18n.t("Onboarding.SuggestedContacts.follow") }}
        </v-btn>

        <v-btn
          v-if="contactData.requestHasBeenSent && !contactData.connected"
          color="primary"
          height="35"
          width="35%"
          class="mx-4"
          small
          depressed
          @click="sendContactRequest"
        >
          {{ $i18n.t("Onboarding.SuggestedContacts.cancelAdd") }}
        </v-btn>

        <v-btn
          v-if="!contactData.requestHasBeenSent && !contactData.pendingRequest && !contactData.connected"
          color="primary"
          height="35"
          width="35%"
          class="mx-4"
          small
          depressed
          @click="sendContactRequest"
        >
          {{ $i18n.t("Onboarding.SuggestedContacts.add") }}
        </v-btn>

        <v-btn
          v-if="contactData.pendingRequest && !contactData.connected"
          color="primary"
          height="35"
          width="35%"
          class="mx-4"
          small
          depressed
          @click="acceptContact"
        >
          {{ $i18n.t("accept") }}
        </v-btn>
      </v-col>
    </v-row>
    <DeleteContactDialog
      :firstName="contactData.firstName"
      :lastName="contactData.lastName"
      v-if="showDeleteDialog"
      v-model="showDeleteDialog"
      @deleteFromNetwork="deleteFromNetwork"
      :isFollow="false"
    ></DeleteContactDialog>
  </v-card>
</template>

<script lang="ts">
import Vue, { PropType } from "vue";
import { VueConstructor } from "vue/types/umd";
import { Profile } from "@/models/profile";
import medalsMixin, { MedalsMixin } from "@/mixins/medals";
import { postContactRequest, deleteContactRequest, deleteContact } from "@/services/contact";
import { postContactRequestResponse } from "@/services/receivedContactRequests";
import { postFollow, deleteFollow } from "@/services/follow";
import { ContactRequestResponse } from "@/models/contactRequestResponse";
import DeleteContactDialog from "@/components/Profile/DeleteContactDialog.vue";

export default (Vue as VueConstructor<Vue & MedalsMixin>).extend({
  name: "Contact",

  props: {
    contactData: Object as PropType<Profile>
  },

  components: {
    DeleteContactDialog
  },

  mixins: [medalsMixin],

  data: () => ({
    contactRequestSended: false,
    followed: false,
    showDeleteDialog: false,
    wasContactDeleted: false,
    isContactConnected: false
  }),

  methods: {
    redirectToProfile() {
      const redirectTo = `/profile/${this.contactData.canonicalName}`;
      if (this.$router.currentRoute.path === redirectTo) {
        window.scroll({
          top: 0,
          left: 0,
          behavior: "smooth"
        });
      } else {
        this.$router.push(redirectTo);
      }
    },
    async followUser() {
      if (this.contactDataComputed.following) {
        await deleteFollow(this.contactData.canonicalName);
        this.contactData.followerQty--;
      } else {
        await postFollow(this.contactData.canonicalName);
        this.contactData.followerQty++;
      }
      this.contactDataComputed.following = !this.contactDataComputed.following;
    },
    async sendContactRequest() {
      if (this.contactDataComputed.requestHasBeenSent) {
        await deleteContactRequest(this.contactData.canonicalName);
      } else {
        await postContactRequest({ canonicalName: this.contactData.canonicalName });
      }
      this.contactDataComputed.requestHasBeenSent = !this.contactDataComputed.requestHasBeenSent;
    },
    async deleteContact() {
      await deleteContact(this.contactData.canonicalName);
      this.contactDataComputed.connected = false;
      this.contactData.contactQty--;
    },
    async acceptContact() {
      await postContactRequestResponse({
        requesterCanonicalName: this.contactData.canonicalName,
        acceptContact: true
      } as ContactRequestResponse);
      this.contactDataComputed.connected = true;
      this.contactData.contactQty++;
    },

    async deleteFromNetwork() {
      await deleteContact(this.contactData.canonicalName);
      this.isContactConnected = false;
    }
  },

  computed: {
    contactDataComputed(): Profile {
      return this.contactData;
    }
  },

  created() {
    this.isContactConnected = this.contactDataComputed.connected;
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

.user__name {
  cursor: pointer;
}

.user__profile-image {
  cursor: pointer;
}

.user__name {
  max-width: 180px;
}
</style>
