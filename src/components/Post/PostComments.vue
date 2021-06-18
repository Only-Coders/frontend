<template>
  <div>
    <v-row no-gutters class="comment_divider mx-6">
      <v-divider class="mb-4"></v-divider>
    </v-row>

    <v-row no-gutters class="comment_divider mx-6">
      <v-col>
        <h3 class="font-weight-regular text--secondary text-capitalize mb-6">{{ $i18n.t("Feed.comments") }}</h3>
      </v-col>
    </v-row>

    <v-row no-gutters justify="center">
      <v-col cols="12" align="center" v-if="fetching">
        <v-progress-circular align="center" indeterminate color="primary" class="my-12"></v-progress-circular>
      </v-col>

      <v-col v-else cols="11" v-for="comment in comments" :key="comment.id">
        <CommentComponent :comment="comment" class="mb-6 mx-10"></CommentComponent>
      </v-col>
    </v-row>

    <v-row no-gutters justify="end" class="mx-16 mb-5 mt-6">
      <v-btn depressed small rounded outlined color="#a4a4a4" class="mr-2" @click="$emit('loadMoreComments')">
        {{ $i18n.t("loadMore") }}</v-btn
      >
      <v-btn depressed small rounded outlined color="#a4a4a4" @click="$emit('hideComments')">
        {{ $i18n.t("hide") }}</v-btn
      >
    </v-row>
  </div>
</template>

<script lang="ts">
import Vue, { PropType } from "vue";
import { Comment } from "@/models/comment";
import CommentComponent from "@/components/Post/Comment.vue";

export default Vue.extend({
  name: "PostComments",

  props: { comments: Array as PropType<Comment[]>, fetching: Boolean },

  data: () => ({
    comment: [] as Comment[]
  }),

  components: {
    CommentComponent
  }
});
</script>

<style scoped></style>
