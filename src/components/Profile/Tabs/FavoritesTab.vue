<template>
  <div>
    <v-row class="mt-14" no-gutters>
      <v-col cols="10 offset-1" md="5">
        <PostContainer :posts="posts" :showCreateProfile="showCreateProfile"></PostContainer>
      </v-col>
    </v-row>
    <infinite-loading v-if="enableInfiniteScroll" spinner="spiral" @infinite="loadMore"></infinite-loading>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import PostContainer from "@/components/Post/PostContainer.vue";
import InfiniteLoading from "vue-infinite-loading";
import { getFavoritePosts } from "@/services/user";
import { GetPost } from "@/models/post";

export default Vue.extend({
  name: "FavoritesTab",

  components: { PostContainer, InfiniteLoading },

  props: { showCreateProfile: Boolean },

  data: () => ({
    posts: [] as GetPost[],
    currentPage: 0,
    enableInfiniteScroll: false
  }),

  methods: {
    async fetchPosts() {
      const result = await getFavoritePosts(this.currentPage, 4);
      this.currentPage++;
      this.posts = result.content;
      if (result.totalElements !== 0) {
        this.enableInfiniteScroll = true;
      }
    },

    async loadMore($state: { loaded: () => void; complete: () => void }) {
      setTimeout(async () => {
        const result = await getFavoritePosts(this.currentPage, 4);
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
