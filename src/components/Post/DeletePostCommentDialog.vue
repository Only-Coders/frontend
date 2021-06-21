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
        <h4>{{ $i18n.t("Feed.deletePostConfirmation") }}</h4>
      </v-card-text>

      <v-card-actions class="mt-8">
        <v-spacer></v-spacer>

        <v-btn color="error" text @click="close"> {{ $i18n.t("cancel") }} </v-btn>

        <v-btn color="primary" text class="ml-6" @click="deletePost"> {{ $i18n.t("Feed.deleteButtonLabel") }} </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import Vue from "vue";
import { deletePost } from "@/services/post";

export default Vue.extend({
  name: "DeletePostDialog",

  props: { value: Boolean, postId: String, commentId: String },

  data: () => ({}),

  methods: {
    close() {
      this.$emit("input");
    },
    async deletePost() {
      await deletePost(this.postId);
      this.$emit("deletePost", this.postId);
      this.close();
    },
    async deleteComment() {
      await deletePost(this.postId);
      this.$emit("deletePost", this.postId);
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
