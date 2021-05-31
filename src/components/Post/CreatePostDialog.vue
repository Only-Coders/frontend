<template>
  <v-dialog :value="value" @input="close" transition="dialog-top-transition" max-width="800" height="90vh">
    <v-card class="d-flex flex-column">
      <v-toolbar color="primary" dark>
        <h2 class="ml-4">{{ $i18n.t("CreatePost.createPost") }}</h2>
        <v-spacer></v-spacer>
        <v-btn class="mr-2 mt-1" icon @click="close">
          <v-icon size="27"> mdi-close </v-icon>
        </v-btn>
      </v-toolbar>

      <v-card-text>
        <Mentions :post="post" @addLink="showLinkPreview"></Mentions>

        <div v-if="imageToShow">
          <v-btn class="mr-2 mt-1" fab small absolute color="secondary" @click="deleteImage">
            <v-icon size="16" color="white"> mdi-close </v-icon>
          </v-btn>
          <v-img v-if="imageToShow" :src="imageToShow" />
        </div>

        <FileType v-if="fileToShow" @deleteFile="deleteFileShowed" :name="fileData.name"></FileType>

        <div v-if="post.url">
          <v-btn class="mr-12 mt-n3" style="" fab small absolute color="secondary" @click="deleteLinkPreview">
            <v-icon size="16" color="white"> mdi-close </v-icon>
          </v-btn>
          <LinkPreview v-if="post.url" :url="post.url" @click="handleClick"></LinkPreview>
        </div>
      </v-card-text>

      <v-divider></v-divider>
      <v-card-actions class="my-1">
        <v-btn :disabled="!enabledButtons" icon class="mx-2" large @click="handleShowImageSelector">
          <input type="file" ref="imageUp" @change="previewImage" style="display: none" lazy-src />
          <v-icon size="30"> mdi-image </v-icon>
        </v-btn>

        <v-btn :disabled="!enabledButtons" icon class="mx-2" large @click="handleShowFileSelector">
          <input type="file" ref="fileUp" @change="previewFile" style="display: none" lazy-src />
          <v-icon size="30">mdi-rotate-270 mdi-attachment </v-icon>
        </v-btn>

        <v-btn :disabled="!enabledButtons" icon class="mx-2" large @click="insertCodeExample">
          <v-icon size="30"> mdi-code-braces </v-icon>
        </v-btn>

        <v-btn icon class="mx-2" large :disabled="!enabledButtons" @click="showLinkDialog = true">
          <v-icon size="30"> mdi-link-variant </v-icon>
        </v-btn>
        <LinkModal @addLink="showLinkPreview" v-model="showLinkDialog"></LinkModal>
        <v-divider vertical class="ml-2"></v-divider>

        <v-select
          v-model="post.isPublic"
          :items="privacyOptions"
          item-text="text"
          item-value="public"
          label="Privacy"
          rounded
          outlined
          dense
          class="privacy_combo ml-6"
          hide-details
        >
          <v-icon size="20" class="pt-1" slot="prepend-inner">
            {{ post.isPublic ? "mdi-earth" : "mdi-account" }}
          </v-icon>
        </v-select>

        <v-spacer></v-spacer>
        <v-btn
          color="primary"
          depressed
          class="mr-3"
          :disabled="enabledButtons && post.message == ''"
          @click="createPost"
          >{{ $i18n.t("CreatePost.createPostBtn") }}</v-btn
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
import Mentions from "@/components/Post/Mentions.vue";
import LinkModal from "@/components/Post/LinkModal.vue";
import LinkPreview from "@/components/Post/LinkPreview.vue";
import { VueConstructor } from "vue/types/umd";
import commonMethodsMixin, { CommonMethodsMixin } from "@/mixins/commonMethods";

type PrivacyOption = {
  text: string;
  public: boolean;
};

export default (Vue as VueConstructor<Vue & CommonMethodsMixin>).extend({
  name: "CreatePostDialog",

  components: { FileType, Mentions, LinkModal, LinkPreview },

  props: { value: Boolean },

  mixins: [commonMethodsMixin],

  data: () => ({
    imageData: null as File | null,
    imageToShow: "",
    fileData: null as File | null,
    fileToShow: "",
    enabledButtons: true,
    privacyOptions: [] as PrivacyOption[],
    codeExample: "```javascript\n//Put your code here...\n```",
    showLinkDialog: false,
    post: {
      message: "",
      type: PostType.TEXT,
      isPublic: true,
      url: "",
      mentionCanonicalNames: [],
      tagNames: []
    } as Post
  }),

  methods: {
    handleShowImageSelector() {
      (this.$refs.imageUp as HTMLButtonElement).click();
    },
    handleShowFileSelector() {
      (this.$refs.fileUp as HTMLButtonElement).click();
    },
    previewImage(event: Event) {
      const target = event.target as HTMLInputElement;
      if (target.files && (target.files[0]["type"] === "image/jpeg" || target.files[0]["type"] === "image/png")) {
        this.imageData = target.files[0];
        this.imageToShow = URL.createObjectURL(target.files[0]);
        this.enabledButtons = false;
        this.post.type = PostType.IMAGE;
      }
      target.value = "";
    },
    previewFile(event: Event) {
      const target = event.target as HTMLInputElement;
      if (target.files) {
        this.fileData = target.files[0];
        this.fileToShow = URL.createObjectURL(target.files[0]);
        this.enabledButtons = false;
        this.post.type = PostType.FILE;
      }
      target.value = "";
    },
    async onUploadImage() {
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
    async onUploadFile() {
      if (this.fileData) {
        const response = await storage.ref(`files/${this.fileData.name}`).put(this.fileData);
        this.post.url = await response.ref.getDownloadURL();
      }
    },
    deleteImage() {
      this.enabledButtons = true;
      this.imageToShow = "";
      this.imageData = null;
      this.post.type = PostType.TEXT;
    },
    deleteFileShowed() {
      this.enabledButtons = true;
      this.fileToShow = "";
      this.fileData = null;
      this.post.type = PostType.TEXT;
    },
    async createPost() {
      try {
        if (this.post.type == PostType.IMAGE) {
          await this.onUploadImage();
        } else if (this.post.type == PostType.FILE) {
          await this.onUploadFile();
        }
        this.post.tagNames = this.post.tagNames.filter((tagName) => {
          return this.post.message.includes(tagName);
        });

        this.post.mentionCanonicalNames = this.post.mentionCanonicalNames.filter((name) => {
          return this.post.message.includes(name);
        });
        await post(this.post);
        this.close();
      } catch (error) {
        console.log(error);
      }
    },
    insertCodeExample() {
      this.post.message = this.post.message + "\n" + this.codeExample;
    },
    showLinkPreview(url: string, evt: ClipboardEvent) {
      if (!this.post.url && this.validURL(url)) {
        this.post.url = url;
        this.post.type = PostType.LINK;
        this.enabledButtons = false;
        evt.preventDefault();
      }
    },
    deleteLinkPreview() {
      this.post.url = "";
      this.post.type = PostType.TEXT;
      this.enabledButtons = true;
    },
    close() {
      this.$emit("input");
    }
  },

  created() {
    this.privacyOptions.push({ text: this.$i18n.t("CreatePost.PrivacyPost.public").toString(), public: true });
    this.privacyOptions.push({ text: this.$i18n.t("CreatePost.PrivacyPost.private").toString(), public: false });

    this.post.isPublic = this.$store.state.userModule.user.defaultPrivacy;
  }
});
</script>

<style lang="scss" scoped>
.privacy_combo {
  border-radius: 50px !important;
  max-width: 240px;
}
</style>
