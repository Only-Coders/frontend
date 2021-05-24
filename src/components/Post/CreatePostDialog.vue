<template>
  <v-dialog v-model="show" transition="dialog-top-transition" max-width="800" height="90vh">
    <v-card class="d-flex flex-column">
      <v-toolbar color="primary" dark>
        <h2 class="ml-4">Crear publicación</h2>
        <v-spacer></v-spacer>
        <v-btn class="mr-2 mt-1" icon @click.stop="show = false">
          <v-icon size="27"> mdi-close </v-icon>
        </v-btn>
      </v-toolbar>

      <v-card-text>
        <v-textarea
          placeholder="Escribe un mensaje..."
          v-model="post.message"
          auto-grow
          maxlength="2048"
          class="mt-4"
          flat
          solo
          counter
        ></v-textarea>
        <div v-if="imageToShow">
          <v-btn class="btn_cross mr-2 mt-1" fab small absolute color="secondary" @click="deleteImage">
            <v-icon size="22" color="white"> mdi-close </v-icon>
          </v-btn>
          <v-img v-if="imageToShow" :src="imageToShow" />
        </div>

        <FileType></FileType>
      </v-card-text>

      <v-divider></v-divider>
      <v-card-actions class="my-1">
        <input type="file" ref="imageUp" style="display: none" @change="previewImage" />
        <v-btn :disabled="!enabledButtons" icon class="mx-2" large @click="$refs.imageUp.click()">
          <v-icon size="30"> mdi-image </v-icon>
        </v-btn>

        <v-btn :disabled="!enabledButtons" icon class="mx-2" large>
          <v-icon size="30">mdi-rotate-270 mdi-attachment </v-icon>
        </v-btn>

        <v-btn :disabled="!enabledButtons" icon class="mx-2" large>
          <v-icon size="30"> mdi-code-braces </v-icon>
        </v-btn>

        <v-divider vertical class="ml-2"></v-divider>
        <v-combobox
          v-model="selectedPrivacy"
          :items="privacyOptions"
          label="Privacy"
          :value="post.isPublic"
          rounded
          outlined
          dense
          class="privacy_combo ml-6"
          hide-details
        >
          <v-icon size="20" slot="prepend-inner">
            {{ post.isPublic ? "mdi-earth" : "mdi-account" }}
          </v-icon>
        </v-combobox>

        <v-spacer></v-spacer>
        <!-- <v-btn class="mx-10" fab dark color="primary" @click="createPost" @click.stop="show = false">
          <v-icon dark> mdi-send </v-icon>
        </v-btn> -->
        <v-btn
          color="primary"
          depressed
          class="mr-3"
          :disabled="enabledButtons && post.message == ''"
          @click="createPost"
          >Publicar</v-btn
        >
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import Vue from "vue";
import { PostType } from "@/models/Enums/postType";
import { post } from "@/services/post";
import { Post } from "@/models/post";
import Compressor from "compressorjs";
import { storage } from "@/plugins/firebaseInit";
import FileType from "@/components/Post/FileType.vue";

export default Vue.extend({
  name: "CreatePostDialog",

  components: { FileType },

  props: { visible: Boolean },

  data: () => ({
    imageData: null as File | null,
    imageToShow: "",
    enabledButtons: true,
    privacyOptions: [] as string[],
    selectedPrivacy: "",
    post: {
      message: "",
      type: PostType.TEXT,
      isPublic: false,
      url: "",
      mentionCanonicalNames: [],
      tagNames: []
    } as Post
  }),

  methods: {
    handleShowFileSelector() {
      (this.$refs.input1 as HTMLButtonElement).click();
    },
    previewImage(event: Event) {
      const target = event.target as HTMLInputElement;
      if (target.files && (target.files[0]["type"] === "image/jpeg" || target.files[0]["type"] === "image/png")) {
        this.imageData = target.files[0];
        this.imageToShow = URL.createObjectURL(target.files[0]);
        this.enabledButtons = false;
        this.post.type = PostType.IMAGE;
      }
    },
    async onUpload() {
      //TODO: Pasar a mixin
      const imageData = this.imageData as File;
      const imageCompresor = new Promise<string>((resolve, reject) => {
        new Compressor(imageData, {
          quality: 0.2,
          async success(result: File) {
            const snapshot = await storage.ref(`images/${result.name}`).put(result);
            const imageUrl = await snapshot.ref.getDownloadURL();
            resolve(imageUrl);
          },
          error(err) {
            reject(err);
          }
        });
      });
      this.post.url = await imageCompresor;
    },
    deleteImage() {
      this.enabledButtons = true;
      this.imageToShow = "";
      this.imageData = null;
      this.post.type = PostType.TEXT;
    },
    async createPost() {
      try {
        if (this.post.type == PostType.IMAGE) {
          await this.onUpload();
        }
        post(this.post);
      } catch (error) {
        console.log(error);
      }
    }
  },

  computed: {
    show: {
      get() {
        return this.visible;
      },
      set(value) {
        if (!value) {
          this.$emit("close");
        }
      }
    }
  },

  created() {
    this.privacyOptions.push(this.$i18n.t("CreatePost.PrivacyPost.public").toString());
    this.privacyOptions.push(this.$i18n.t("CreatePost.PrivacyPost.private").toString());
  }
});
</script>

<style lang="scss" scoped>
.v-card__text {
  flex: 1 1 auto;
}
.v-toolbar {
  flex: 0;
}
.v-textarea {
  font-size: 1.2rem;
}
.btn_cross {
  color: white;
  right: 0;
}
.privacy_combo {
  border-radius: 50px !important;
  max-width: 220px;
}
</style>
