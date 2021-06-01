<template>
  <div>
    <v-row class="mt-14" no-gutters>
      <v-col cols="2 offset-1" sm="3" lg="2" class="hidden-sm-and-down">
        <FeedProfilePreview></FeedProfilePreview>

        <Suggestions class="mt-16"></Suggestions>
      </v-col>

      <v-col cols="10 offset-1" md="5">
        <PostContainer :posts="posts"></PostContainer>
      </v-col>
    </v-row>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import FeedProfilePreview from "@/components/Feed/FeedProfilePreview.vue";
import Suggestions from "@/components/Feed/Suggestions.vue";
import PostContainer from "@/components/Post/PostContainer.vue";
import { getPost } from "@/services/post";
import { GetPost } from "@/models/post";

export default Vue.extend({
  name: "Feed",

  components: { FeedProfilePreview, Suggestions, PostContainer, ViewPost },

  data: () => ({
    posts: [] as GetPost[]
  }),

  methods: {
    async fetchPosts() {
      const result = await getPost();
      this.posts = result.content;
    }
  },

  async created() {
    await this.fetchPosts();
  }
});
</script>

<style scoped></style>
