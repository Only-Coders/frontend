<template>
  <div>
    <v-sheet v-if="loading" color="grey lighten-4" class="pa-3">
      <v-skeleton-loader
        type="list-item-avatar, divider, list-item-three-line, card-heading, image, actions"
      ></v-skeleton-loader>
    </v-sheet>

    <v-card class="card_profile" v-if="userDataComputed && !loading">
      <div class="d-flex justify-center mt-9">
        <v-avatar size="160">
          <v-img
            alt="user"
            :src="userDataComputed.imageURI ? userDataComputed.imageURI : require('@/assets/images/default-avatar.png')"
          />
        </v-avatar>
      </div>

      <h2 class="mt-5 text-center font-weight-medium">
        {{ userDataComputed.firstName }}
        {{ userDataComputed.lastName }}
      </h2>

      <h4 class="center subtitle-1 text--secondary text-center">
        {{ userDataComputed.currentPosition ? userDataComputed.currentPosition.position + " " + $i18n.t("at") : "" }}
        {{ userDataComputed.currentPosition ? userDataComputed.currentPosition.workplace.name : "" }}
      </h4>

      <v-row justify="center" class="mt-5" no-gutters>
        <v-col class="d-flex justify-center">
          <div class="pl-2">
            <v-img alt="gold-medal" width="20" src="@/assets/images/gold-medal.png" />
          </div>

          <span class="font-weight-light pr-5 pl-1 text-caption">{{
            calculateMedals(userDataComputed.medalQty).gold
          }}</span>

          <div>
            <v-img alt="silver-medal" width="20" src="@/assets/images/silver-medal.png" />
          </div>
          <span class="font-weight-light pr-5 pl-1 text-caption">{{
            calculateMedals(userDataComputed.medalQty).silver
          }}</span>

          <div>
            <v-img alt="bronce-medal" width="20" src="@/assets/images/bronce-medal.png" />
          </div>
          <span class="font-weight-light pl-1 text-caption">{{
            calculateMedals(userDataComputed.medalQty).bronce
          }}</span>
        </v-col>
      </v-row>

      <v-row justify="center" class="mb-1 mt-6" no-gutters>
        <v-col cols="4">
          <v-card-title class="py-1 justify-center">{{ userDataComputed.postQty }}</v-card-title>
          <p class="pt-0" align="center">{{ $i18n.t("Feed.posts") }}</p>
        </v-col>
        <v-col cols="4">
          <v-card-title class="py-1 justify-center">{{ userDataComputed.followerQty }}</v-card-title>

          <p class="pt-0" align="center">{{ $i18n.t("Feed.followers") }}</p>
        </v-col>
        <v-col cols="4">
          <v-card-title class="py-1 justify-center">{{ userDataComputed.contactQty }}</v-card-title>

          <p class="pt-0" align="center">{{ $i18n.t("Feed.contacts") }}</p>
        </v-col>
      </v-row>

      <v-row no-gutters class="mt-14" v-if="!isSelfProfile">
        <v-col cols="12 text-center" class="mb-6">
          <v-btn
            height="35"
            width="65%"
            color="#ee5e5e"
            class="mx-4"
            v-if="userDataComputed.connected"
            depressed
            dark
            small
            @click.stop="createDialog = true"
          >
            {{ $i18n.t("delete") }}
          </v-btn>

          <v-btn
            v-if="userDataComputed.following && !userDataComputed.connected"
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
            v-if="!userDataComputed.following && !userDataComputed.connected"
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
            v-if="userDataComputed.requestHasBeenSent && !userDataComputed.connected"
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
            v-if="
              !userDataComputed.requestHasBeenSent && !userDataComputed.pendingRequest && !userDataComputed.connected
            "
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
            v-if="userDataComputed.pendingRequest && !userDataComputed.connected"
            color="primary"
            height="35"
            width="35%"
            class="mx-4"
            small
            depressed
            @click="sendContactRequest"
          >
            {{ $i18n.t("accept") }}
          </v-btn>
        </v-col>
      </v-row>
    </v-card>

    <DeleteContactDialog
      v-bind="{ ...userDataComputed }"
      v-if="createDialog"
      v-model="createDialog"
      @deleteFromNetwork="deleteContact"
    ></DeleteContactDialog>
  </div>
</template>

<script lang="ts">
import Vue, { PropType } from "vue";
import { Profile } from "@/models/profile";
import { Medals } from "@/models/medals";
import { postContactRequest, deleteContactRequest, deleteContact } from "@/services/contact";
import { postFollow, deleteFollow } from "@/services/follow";
import DeleteContactDialog from "@/components/Profile/DeleteContactDialog.vue";

export default Vue.extend({
  name: "ProfilePreview",

  props: { userData: Object as PropType<Profile>, isSelfProfile: Boolean, loading: Boolean },

  components: { DeleteContactDialog },

  data: () => ({
    medals: {} as Medals,
    contactRequestSended: false,
    contactRequestReceived: false,
    followed: false,
    isContact: false,
    createDialog: false
  }),

  methods: {
    calculateMedals(approves: number): Medals {
      if (approves) {
        const bronce = approves % 100;
        approves = (approves - bronce) / 100;
        const silver = approves % 100;
        const gold = (approves - silver) / 100;
        return { gold, silver, bronce };
      } else {
        return { gold: 0, silver: 0, bronce: 0 };
      }
    },

    async followUser() {
      if (this.userDataComputed.following) {
        await deleteFollow(this.userData.canonicalName);
        this.userData.followerQty--;
      } else {
        await postFollow(this.userData.canonicalName);
        this.userData.followerQty++;
      }
      this.userDataComputed.following = !this.userDataComputed.following;
    },
    async sendContactRequest() {
      if (this.userDataComputed.requestHasBeenSent) {
        await deleteContactRequest(this.userData.canonicalName);
      } else {
        await postContactRequest({ canonicalName: this.userData.canonicalName });
      }
      this.userDataComputed.requestHasBeenSent = !this.userDataComputed.requestHasBeenSent;
    },
    async deleteContact() {
      await deleteContact(this.userData.canonicalName);
      this.userDataComputed.connected = false;
      this.userData.contactQty--;
    }
  },

  computed: {
    userDataComputed() {
      return this.userData;
    }
  },

  created() {
    if (!this.isSelfProfile && this.userData) {
      this.isContact = this.userData.connected;
      this.contactRequestReceived = this.userData.pendingRequest;
      this.contactRequestSended = this.userData.requestHasBeenSent;
      this.followed = this.userData.following;
    }
  }
});
</script>

<style lang="scss" scoped>
.profile__banner {
  position: relative;
  background: #00cdae;
  height: 70px;
  display: flex;
  justify-content: center;
}
.card_profile {
  border-top: 3px solid var(--v-primary-base) !important;
}
</style>
