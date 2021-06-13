<template>
  <v-dialog :value="value" @input="close" transition="dialog-top-transition" max-width="800" height="90vh">
    <v-card class="d-flex flex-column">
      <v-toolbar color="primary" dark>
        <h2 class="ml-4">{{ $i18n.t("EditPost.editPost") }}</h2>
        <v-spacer></v-spacer>
        <v-btn class="mr-2 mt-1" icon @click="close">
          <v-icon size="27"> mdi-close </v-icon>
        </v-btn>
      </v-toolbar>

      <v-card-text>
        <Mentions :post="changedPost" @addLink="showLinkPreview" @addPicture="addPicture"></Mentions>

        <div v-if="imageToShow" class="d-flex justify-center">
          <v-btn class="mr-2 mt-1 remove_img_btn" fab small absolute color="secondary" @click="deleteImagePreview">
            <v-icon size="16" color="white"> mdi-close </v-icon>
          </v-btn>
          <v-img :max-width="$vuetify.breakpoint.mdAndUp ? '30vw' : '95vw'" v-if="imageToShow" :src="imageToShow" />
        </div>

        <FileType
          v-if="fileToShow"
          @deleteFile="deleteFileShowed"
          :name="fileData.name"
          :isVisualizingPost="false"
        ></FileType>

        <div v-if="changedPost.url && changedPost.type === 'LINK'">
          <v-btn class="mr-12 mt-n3" style="" fab small absolute color="secondary" @click="deleteLinkPreview">
            <v-icon size="16" color="white"> mdi-close </v-icon>
          </v-btn>
          <LinkPreview v-if="changedPost.url" :url="changedPost.url"></LinkPreview>
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
          v-model="changedPost.isPublic"
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
            {{ changedPost.isPublic ? "mdi-earth" : "mdi-account" }}
          </v-icon>
        </v-select>

        <v-spacer></v-spacer>
        <v-btn
          :loading="isLoading"
          color="primary"
          depressed
          class="mr-3"
          :disabled="enabledButtons && changedPost.message == ''"
          @click="editPost"
          >{{ $i18n.t("EditPost.editPostBtn") }}</v-btn
        >
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import Vue, { PropType } from "vue";
import { PostType } from "@/models/Enums/postType";
import { uuid } from "@/plugins/uuid";
import { editPost, getPost } from "@/services/post";
import { Post } from "@/models/post";
import Compressor from "compressorjs";
import { storage } from "@/plugins/firebaseInit";
import FileType from "@/components/Post/FileType.vue";
import Mentions from "@/components/Post/Mentions.vue";
import LinkModal from "@/components/Post/LinkModal.vue";
import LinkPreview from "@/components/Post/LinkPreview.vue";
import { VueConstructor } from "vue/types/umd";
import commonMethodsMixin, { CommonMethodsMixin } from "@/mixins/commonMethods";
import notificationsMixin, { NotificationMixin } from "@/mixins/notifications";
import { i18n } from "@/main";
import { GetPost } from "@/models/post";

type PrivacyOption = {
  text: string;
  public: boolean;
};

export default (Vue as VueConstructor<Vue & CommonMethodsMixin & NotificationMixin>).extend({
  name: "EditPostDialog",

  components: { FileType, Mentions, LinkModal, LinkPreview },

  props: { value: Boolean, post: Object as PropType<GetPost>, postMessageToEdit: String },

  mixins: [commonMethodsMixin, notificationsMixin],

  data: () => ({
    imageData: null as File | null,
    imageToShow: "",
    fileData: null as File | null,
    fileToShow: "",
    enabledButtons: true,
    privacyOptions: [
      { text: i18n.t("EditPost.PrivacyPost.public").toString(), public: true },
      { text: i18n.t("EditPost.PrivacyPost.private").toString(), public: false }
    ] as PrivacyOption[],
    codeExample: "```javascript\n//Put your code here...\n```",
    showLinkDialog: false,
    isLoading: false,
    changedPost: {
      message: "",
      type: PostType.TEXT,
      isPublic: true,
      url: "",
      mentionCanonicalNames: [],
      tagNames: [],
      mentionsDictionary: {}
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
        this.changedPost.type = PostType.IMAGE;
      }
      target.value = "";
    },
    previewFile(event: Event) {
      const target = event.target as HTMLInputElement;
      if (target.files) {
        this.fileData = target.files[0];
        this.fileToShow = URL.createObjectURL(target.files[0]);
        this.enabledButtons = false;
        this.changedPost.type = PostType.FILE;
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
            const fileName = uuid();
            const snapshot = await storage.ref(`images/${fileName}`).put(result);
            const imageUrl = await snapshot.ref.getDownloadURL();
            resolve(imageUrl);
          },
          error(err) {
            reject(err);
          }
        });
      });
      this.changedPost.url = await imageCompresor;
    },
    async onUploadFile() {
      if (this.fileData) {
        const response = await storage.ref(`files/${this.fileData.name}`).put(this.fileData);
        this.changedPost.url = await response.ref.getDownloadURL();
      }
    },
    deleteFileShowed() {
      this.enabledButtons = true;
      this.fileToShow = "";
      this.fileData = null;
      this.changedPost.type = PostType.TEXT;
    },
    async editPost() {
      try {
        this.isLoading = true;

        this.extractTags();

        if (this.changedPost.type == PostType.IMAGE) {
          await this.onUploadImage();
        } else if (this.changedPost.type == PostType.FILE) {
          await this.onUploadFile();
        }
        const editedPost = { ...this.changedPost };

        editedPost.tagNames = editedPost.tagNames.filter((tagName) => {
          return editedPost.message.includes(tagName);
        });

        editedPost.mentionCanonicalNames = editedPost.mentionCanonicalNames.filter((canonicalName) => {
          if (editedPost.message.includes("@" + editedPost.mentionsDictionary[canonicalName])) {
            editedPost.message = editedPost.message.replaceAll(
              "@" + editedPost.mentionsDictionary[canonicalName],
              "@" + canonicalName
            );
            return true;
          }
        });

        const changedPost = await editPost(this.post.id, editedPost);
        this.$emit("passPostToParent", changedPost);
        this.success("", this.$i18n.t("EditPost.successfullEdition").toString(), 2000);
        this.close();
      } catch (error) {
        this.error("Error", this.$i18n.t("EditPost.errorEdition").toString());
        console.log(error);
      } finally {
        this.isLoading = false;
      }
    },
    extractTags() {
      const regex = /(?<!\S)#(?<hash>\S+)(\s|$)/gm;
      const tagsSet = new Set<string>();
      let match = regex.exec(this.changedPost.message);
      do {
        const tag = match?.groups?.hash;
        if (tag) tagsSet.add(tag);
        match = regex.exec(this.changedPost.message);
      } while (match);
      const tags = [...tagsSet];

      this.changedPost.tagNames.push(...tags);
    },
    insertCodeExample() {
      this.changedPost.message = this.changedPost.message + "\n" + this.codeExample;
    },
    showLinkPreview(url: string, evt: ClipboardEvent) {
      this.deleteImagePreview();
      if (!this.changedPost.url && this.validURL(url)) {
        this.changedPost.url = url;
        this.changedPost.type = PostType.LINK;
        this.enabledButtons = false;
        evt?.preventDefault();
      }
    },
    addPicture(image: File) {
      this.deleteLinkPreview();
      this.changedPost.type = PostType.IMAGE;
      this.imageData = image as File;
      this.imageToShow = URL.createObjectURL(image);
      this.enabledButtons = false;
    },
    deleteLinkPreview() {
      this.changedPost.url = "";
      this.changedPost.type = PostType.TEXT;
      this.enabledButtons = true;
    },
    deleteImagePreview() {
      this.changedPost.url = "";
      this.imageData = null;
      this.imageToShow = "";
      this.changedPost.type = PostType.TEXT;
      this.enabledButtons = true;
    },
    close() {
      this.$emit("input");
    },
    escapeRegex(string: string) {
      return string.replace(/[+-/\\^$*+?.()|[\]{}]/g, "\\$&");
    },
    formatMentionsTagsFromMessage() {
      if (this.post.tags.length !== 0) {
        this.post.tags.forEach((tag) => {
          const regex = new RegExp(`#${this.escapeRegex(tag.displayName)}`, "g");
          this.changedPost.message = this.changedPost.message.replace(regex, `#${tag.displayName}`);
        });
      }
      if (this.post.mentions.length !== 0) {
        this.post.mentions.forEach((mention) => {
          const regex = new RegExp(`@${mention.canonicalName}`, "g");
          this.changedPost.message = this.changedPost.message.replace(regex, `@${mention.fullName}`);
        });
      }
    }
  },

  created() {
    this.changedPost.message = this.postMessageToEdit;
    this.imageToShow = this.post.type === "IMAGE" ? this.post.url : "";
    this.changedPost.isPublic = this.$store.state.userModule.user.defaultPrivacy
      ? this.$store.state.userModule.user.defaultPrivacy
      : true;
    this.formatMentionsTagsFromMessage();
    this.changedPost.type = this.post.type as PostType;
    this.changedPost.isPublic = this.post.isPublic;
    this.changedPost.url = this.post.url;
    this.changedPost.mentionCanonicalNames = this.post.mentions.map((mention) => mention.canonicalName);
    this.changedPost.tagNames = this.post.tags.map((tag) => tag.displayName);
    this.changedPost.mentionsDictionary = {};
    this.post.mentions.forEach((mention) => {
      this.changedPost.mentionsDictionary[mention.canonicalName] = mention.fullName;
    });
  }
});
</script>

<style lang="scss" scoped>
.privacy_combo {
  border-radius: 50px !important;
  max-width: 240px;
}

.remove_img_btn {
  right: 112px;
}
</style>
