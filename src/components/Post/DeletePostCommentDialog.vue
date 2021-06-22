<template>
  <v-dialog :value="value" @input="close" width="auto" transition="dialog-top-transition" max-width="650">
    <v-toolbar color="primary" dark>
      <h2 class="ml-4">{{ $i18n.t("Feed.deletePost") }}</h2>
      <v-spacer></v-spacer>
      <v-btn class="mr-2 mt-1" icon @click="close">
        <v-icon size="27"> mdi-close </v-icon>
      </v-btn>
    </v-toolbar>

    <v-card class="px-6 pt-8">
      <v-card-text>
        <h4 v-if="commentId">{{ $i18n.t("Feed.deleteCommentConfirmation") }}</h4>
        <h4 v-else>{{ $i18n.t("Feed.deletePostConfirmation") }}</h4>
      </v-card-text>

      <v-card-actions class="mt-8">
        <v-spacer></v-spacer>

        <v-btn color="error" text @click="close"> {{ $i18n.t("cancel") }} </v-btn>

        <v-btn color="primary" text class="ml-6" @click="deleteAction"> {{ $i18n.t("Feed.deleteButtonLabel") }} </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import Vue from "vue";
import { deletePost } from "@/services/post";
import { deleteComment } from "@/services/comment";

export default Vue.extend({
  name: "DeletePostDialog",

  props: { value: Boolean, postId: String, commentId: String },

  data: () => ({}),

  methods: {
    close() {
      this.$emit("input");
    },
    async deleteAction() {
      if (this.commentId) {
        await deleteComment(this.postId, this.commentId);
        this.$emit("deleteComment", this.commentId);
      } else {
        await deletePost(this.postId);
        this.$emit("deletePost", this.postId);
      }

      this.close();
    }
  }
});
</script>

<style scoped>
.user_name {
  font-size: 1.2em;
}
</style>
