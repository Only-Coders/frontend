<template>
  <div>
    <v-hover v-slot="{ hover }">
      <v-avatar size="160">
        <v-skeleton-loader :loading="true" type="avatar" class="skeleton"> </v-skeleton-loader>

        <transition name="fade">
          <div v-if="hover && isSelfProfile" class="overlay">
            <v-btn
              icon
              small
              fab
              dark
              class="center-camera"
              v-if="isSelfProfile && !temporalImageUploaded && hover"
              @click="handleShowFileSelector"
            >
              <v-icon size="36">mdi-camera</v-icon>
              <input type="file" ref="input1" style="display: none" @change="previewImage" accept="image/*" lazy-src />
            </v-btn>
          </div>
        </transition>

        <v-img
          style="z-index: 9"
          alt="user"
          :src="imageURL ? imageURL : require('@/assets/images/default-avatar.png')"
        />
      </v-avatar>
    </v-hover>

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
</template>

<script lang="ts">
import Vue from "vue";
import { storage } from "@/plugins/firebaseInit";
import Compressor from "compressorjs";

export default Vue.extend({
  name: "ProfilePhoto",

  props: { profileImageURLProp: String, isSelfProfile: Boolean },

  data: () => ({
    imageURL: "",
    temporalImageUploaded: false,
    profileImageData: null as File | null,
    originalImage: ""
  }),

  methods: {
    handleShowFileSelector() {
      (this.$refs.input1 as HTMLButtonElement).click();
    },
    previewImage(event: Event) {
      const target = event.target as HTMLInputElement;
      if (target.files) {
        this.temporalImageUploaded = true;
        this.originalImage = this.imageURL;
        this.profileImageData = target.files[0];
        this.imageURL = URL.createObjectURL(target.files[0]);
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
      this.imageURL = await imageCompresor;
    },

    async confirmPhotoChange() {
      if (this.temporalImageUploaded) {
        await this.onUpload();
        await storage.refFromURL(this.originalImage).delete();
        this.$emit("uploadImage", this.imageURL);
      }
      this.temporalImageUploaded = false;
    },

    cancelPhotoChange() {
      this.imageURL = this.originalImage;
      this.temporalImageUploaded = false;
    }
  },

  created() {
    this.imageURL = this.profileImageURLProp;
  }
});
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
.center-camera {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 50%;
  height: 50%;
}
.overlay {
  width: 100%;
  height: 100%;
  background: #00000060;
  position: absolute;
  z-index: 10;
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
.skeleton {
  position: absolute;
}
</style>

<style>
.skeleton .v-skeleton-loader__avatar {
  width: 480px !important;
  height: 480px !important;
}
</style>
