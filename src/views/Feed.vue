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
    <infinite-loading v-if="enableInfiniteScroll" spinner="spiral" @infinite="loadMore"></infinite-loading>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import FeedProfilePreview from "@/components/Feed/FeedProfilePreview.vue";
import Suggestions from "@/components/Feed/Suggestions.vue";
import PostContainer from "@/components/Post/PostContainer.vue";
import InfiniteLoading from "vue-infinite-loading";
import { getPost } from "@/services/post";
import { GetPost } from "@/models/post";

export default Vue.extend({
  name: "Feed",

  components: { FeedProfilePreview, Suggestions, PostContainer, InfiniteLoading },

  data: () => ({
    posts: [] as GetPost[],
    currentPage: 0,
    enableInfiniteScroll: false
  }),

  methods: {
    async fetchPosts() {
      const result = await getPost(this.currentPage, 5);
      this.currentPage++;
      this.posts = result.content;
      if (result.totalElements !== 0) {
        this.enableInfiniteScroll = true;
      }
    },

    async loadMore($state: { loaded: () => void; complete: () => void }) {
      setTimeout(async () => {
        const result = await getPost(this.currentPage, 5);
        if (result.content.length) {
          this.currentPage += 1;
          this.posts = this.posts.concat(result.content);
          $state.loaded();
        } else {
          $state.complete();
        }
      }, 1250);
    }
  },

  async created() {
    await this.fetchPosts();
  }
});
</script>

<style scoped></style>
