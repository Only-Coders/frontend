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
        <v-btn
          v-if="isSelfProfile && !temporalImageUploaded"
          absolute
          fab
          small
          depressed
          class="edit_photo_btn"
          color="primary"
          @click="handleShowFileSelector"
        >
          <v-icon size="22"> mdi-pencil </v-icon>
          <input type="file" ref="input1" style="display: none" @change="previewImage" accept="image/*" lazy-src />
        </v-btn>
        <v-btn
          v-if="isSelfProfile && temporalImageUploaded"
          absolute
          fab
          small
          depressed
          class="edit_photo_btn"
          color="primary"
          @click="confirmPhotoChange"
        >
          <v-icon size="22"> mdi-check-bold </v-icon>
        </v-btn>

        <v-btn
          v-if="isSelfProfile && temporalImageUploaded"
          absolute
          fab
          small
          depressed
          class="cancel_edit_photo_btn"
          @click="cancelPhotoChange"
          color="error"
        >
          <v-icon size="22"> mdi-close </v-icon>
        </v-btn>
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

          <span class="font-weight-light pr-5 pl-1 text-caption">{{ calculateMedals(userData.medalQty).gold }}</span>

          <div>
            <v-img alt="silver-medal" width="20" src="@/assets/images/silver-medal.png" />
          </div>
          <span class="font-weight-light pr-5 pl-1 text-caption">{{ calculateMedals(userData.medalQty).silver }}</span>

          <div>
            <v-img alt="bronce-medal" width="20" src="@/assets/images/bronce-medal.png" />
          </div>
          <span class="font-weight-light pl-1 text-caption">{{ calculateMedals(userData.medalQty).bronce }}</span>
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
            @click="acceptContact"
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
import { VueConstructor } from "vue/types/umd";
import { Profile } from "@/models/profile";
import { Medals } from "@/models/medals";
import { postContactRequest, deleteContactRequest, deleteContact } from "@/services/contact";
import { postContactRequestResponse } from "@/services/receivedContactRequests";
import { postFollow, deleteFollow } from "@/services/follow";
import { ContactRequestResponse } from "@/models/contactRequestResponse";
import DeleteContactDialog from "@/components/Profile/DeleteContactDialog.vue";
import medalsMixin, { MedalsMixin } from "@/mixins/medals";
import { storage } from "@/plugins/firebaseInit";
import Compressor from "compressorjs";
import { editProfile } from "@/services/user";
import { EditProfile } from "@/models/profile";

export default (Vue as VueConstructor<Vue & MedalsMixin>).extend({
  name: "ProfilePreview",

  mixins: [medalsMixin],

  props: { userData: Object as PropType<Profile>, isSelfProfile: Boolean, loading: Boolean },

  components: { DeleteContactDialog },

  data: () => ({
    medals: {} as Medals,
    contactRequestSended: false,
    contactRequestReceived: false,
    followed: false,
    isContact: false,
    createDialog: false,
    temporalImageUploaded: false,
    profileImageData: null as File | null,
    profileImageToShow: "",
    profileImageURL: "",
    originalImageProfile: ""
  }),

  methods: {
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
    },
    async acceptContact() {
      await postContactRequestResponse({
        requesterCanonicalName: this.userData.canonicalName,
        acceptContact: true
      } as ContactRequestResponse);
      this.userDataComputed.connected = true;
      this.userData.contactQty++;
    },
    handleShowFileSelector() {
      (this.$refs.input1 as HTMLButtonElement).click();
    },

    previewImage(event: Event) {
      const target = event.target as HTMLInputElement;
      if (target.files) {
        this.temporalImageUploaded = true;
        this.profileImageData = target.files[0];
        this.originalImageProfile = this.userDataComputed.imageURI;
        this.userDataComputed.imageURI = URL.createObjectURL(target.files[0]);
        /* this.profileImageToShow = URL.createObjectURL(target.files[0]); */
      }
    },

    async onUpload() {
      const profileImageData = this.profileImageData as File;
      const imageCompresor = new Promise<string>((resolve, reject) => {
        new Compressor(profileImageData, {
          quality: 0.2,
          async success(result: File) {
            const snapshot = await storage.ref(`images/${result.name}`).put(result);
            const profileImageUrl = await snapshot.ref.getDownloadURL();
            resolve(profileImageUrl);
          },
          error(err) {
            reject(err);
          }
        });
      });

      this.profileImageURL = await imageCompresor;
    },

    async confirmPhotoChange() {
      if (this.profileImageToShow !== "") {
        await this.onUpload();
        await editProfile({
          firstName: this.userData.firstName,
          lastName: this.userData.lastName,
          description: this.userData.description,
          imageURI: this.userDataComputed.imageURI,
          birthDate: this.userData.birthDate,
          gitProfile: {
            platform: this.userData.gitProfile.platform,
            userName: this.userData.gitProfile.userName
          },
          country: this.userData.country.code
        } as EditProfile);
        this.temporalImageUploaded = false;
      }
      //this.user.imageURI = this.profileImageURL;
      //TODO borrar de firebase la foto anterior
    },

    cancelPhotoChange() {
      this.userDataComputed.imageURI = this.originalImageProfile;
      this.temporalImageUploaded = false;
    }
  },

  computed: {
    userDataComputed(): Profile {
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
.edit_photo_btn {
  top: 25px;
  right: 90px;
  transition: opacity 0.5s ease-in-out;
}
.cancel_edit_photo_btn {
  top: 70px;
  right: 75px;
  width: 30px;
  height: 30px;
}
</style>
