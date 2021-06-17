<template>
  <div>
    <v-row no-gutters class="comment_divider mx-6">
      <v-divider class="mb-4"></v-divider>
    </v-row>

    <div v-if="showCreateComment" class="mx-8">
      <v-row no-gutters>
        <v-col cols="2" class="text-center">
          <AvatarImagePreview
            :src="
              $store.state.userModule.user && $store.state.userModule.user.imageURI
                ? $store.state.userModule.user.imageURI
                : require('@/assets/images/default-avatar.png')
            "
            :imageSize="60"
          ></AvatarImagePreview>
        </v-col>

        <v-col cols="8">
          <v-textarea
            v-model="message"
            :placeholder="$i18n.t('writeComment')"
            rows="1"
            auto-grow
            row-height="30"
            no-resize
            hide-details
            maxlength="512"
            clearable
          ></v-textarea>

          <v-btn right fab depressed small class="mx-2" @click="insertCodeExample">
            <v-icon size="23"> mdi-code-braces </v-icon>
          </v-btn>
        </v-col>

        <v-col cols="2" class="d-flex align-center">
          <v-btn fab small depressed color="primary" class="ml-6">
            <v-icon>mdi-send</v-icon>
          </v-btn></v-col
        >
      </v-row>

      <v-col cols="12" class="d-flex mt-3">
        <v-btn fab depressed small class="mx-2" @click="insertCodeExample">
          <v-icon size="23"> mdi-code-braces </v-icon>
        </v-btn>
        <!-- <v-spacer></v-spacer>
        <v-btn :loading="isLoading" color="danger" depressed class="mx-5" @click="showCreateComment = false">{{
          $i18n.t("cancel")
        }}</v-btn>
        <v-btn :loading="isLoading" color="primary" depressed :disabled="message == ''" @click="createComment">{{
          $i18n.t("CreatePost.createPostBtn")
        }}</v-btn> -->
      </v-col>
    </div>

    <v-row no-gutters justify="center" v-else>
      <v-col cols="11" class="d-flex justify-end">
        <v-btn depressed rounded outlined color="#E0E0E0" class="mb-5" @click.stop="showCreateComment = true">
          <v-icon color="primary" size="19" class="mr-2"> mdi-comment-text </v-icon>
          <p class="font-weight-regular text--secondary text-capitalize my-auto">
            {{ $i18n.t("comment") }}
          </p>
        </v-btn>
      </v-col>
    </v-row>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { postComment } from "@/services/comment";
import AvatarImagePreview from "@/components/AvatarImagePreview.vue";

export default Vue.extend({
  name: "CreateComment",

  props: { postId: String },

  components: { AvatarImagePreview },

  data: () => ({
    message: "",
    codeExample: "```javascript\n//Put your code here...\n```",
    showCreateComment: false,
    isLoading: false
  }),

  methods: {
    insertCodeExample() {
      this.message = this.message + "\n" + this.codeExample;
    },

    async createComment() {
      this.isLoading = true;
      const result = postComment(this.postId, this.message);
      if (result) {
        this.$emit("addCommentToPost", result);
      }
      this.isLoading = false;
      this.showCreateComment = false;
      //this.message = "";
    }
  }
});
</script>

<style scoped></style>
