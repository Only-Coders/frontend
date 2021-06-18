<template>
  <div>
    <v-row no-gutters class="comment_divider mx-6">
      <v-divider class="mb-4"></v-divider>
    </v-row>

    <div v-if="showCreateComment" class="mx-8">
      <v-row no-gutters class="mb-3" justify="end">
        <v-btn class="mr-2 mt-1" icon @click="showCreateComment = false">
          <v-icon size="22"> mdi-close </v-icon>
        </v-btn>
      </v-row>
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
        </v-col>

        <v-col cols="2">
          <v-btn fab small depressed color="primary" :loading="isLoading" class="mt-2 ml-6 grow" @click="createComment">
            <v-icon>mdi-send</v-icon>
          </v-btn></v-col
        >
      </v-row>

      <v-row no-gutters justify="end" class="pb-10">
        <v-col cols="8 offset-2" class="text-right">
          <v-btn fab depressed @click="insertCodeExample" :disabled="isLoading" class="grow" x-small>
            <v-icon size="20"> mdi-code-braces </v-icon>
          </v-btn>
        </v-col>
        <v-col cols="2"></v-col>
      </v-row>
    </div>

    <v-row no-gutters justify="center" v-else>
      <v-col cols="12" class="d-flex justify-end">
        <v-btn depressed rounded outlined color="#E0E0E0" class="mb-5 mr-6" @click.stop="showCreateComment = true">
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
      const result = await postComment(this.postId, this.message);
      if (result) {
        this.$emit("addCommentToPost", result);
      }
      this.isLoading = false;
      this.showCreateComment = false;
      this.message = "";
    }
  }
});
</script>

<style scoped>
.grow {
  transition: all 0.1s ease-in-out;
}
.grow:hover {
  transform: scale(1.1);
}
</style>
