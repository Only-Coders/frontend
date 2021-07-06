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
          class="profile_image"
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
      class="edit_photo_btn ml-n5"
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
      outlined
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
import { BUCKET_URI, uuid } from "@/plugins/uuid";

export default Vue.extend({
  name: "ProfilePhoto",

  props: { profileImageURLProp: String, isSelfProfile: Boolean },

  data: () => ({
    fileName: "",
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
      const fileName = this.fileName ? this.fileName : uuid();
      const imageCompresor = new Promise<string>((resolve, reject) => {
        new Compressor(profileImageData, {
          quality: 0.2,
          async success(result: File) {
            await storage.ref(`images/${fileName}`).put(result, { cacheControl: "public,max-age=4000" });
            resolve(BUCKET_URI + `images/${fileName}`);
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
        this.$emit("uploadImage", this.imageURL, this.originalImage);
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
    const regex = /images%2(?<img>.*)\?alt/g;
    const matches = regex.exec(this.imageURL);
    this.fileName = matches?.groups?.img ?? "";
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
  top: 6%;
  transition: opacity 0.5s ease-in-out;
  z-index: 10;
}
.cancel_edit_photo_btn {
  top: 16%;
  width: 30px;
  height: 30px;
  z-index: 10;
}
.skeleton {
  position: absolute;
}
</style>

<style>
.profile_image {
  z-index: 9;
}
</style>
