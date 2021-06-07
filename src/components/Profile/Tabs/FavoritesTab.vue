<template>
  <div>
    <v-row no-gutters>
      <v-col cols="10 offset-1" v-if="posts.length > 0">
        <PostContainer
          :posts="posts"
          :showCreateProfile="showCreateProfile"
          :isInFavoritesTab="true"
          @passDeletedPost="deleteFavoritePost"
          @deletePost="deleteUserPost"
        ></PostContainer>
      </v-col>

      <v-col v-else>
        <NoData class="mb-10"></NoData>
      </v-col>
    </v-row>
    <infinite-loading
      v-if="enableInfiniteScroll && posts.length > 0"
      spinner="spiral"
      @infinite="loadMore"
    ></infinite-loading>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import PostContainer from "@/components/Post/PostContainer.vue";
import InfiniteLoading from "vue-infinite-loading";
import { getFavoritePosts } from "@/services/user";
import { GetPost } from "@/models/post";
import NoData from "@/components/NoData.vue";

export default Vue.extend({
  name: "FavoritesTab",

  components: { PostContainer, InfiniteLoading, NoData },

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
    },
    deleteFavoritePost(postId: string) {
      const postIndex = this.posts.findIndex((post) => post.id == postId);
      if (postIndex >= 0) {
        this.posts.splice(postIndex, 1);
      }
    },

    deleteUserPost(postId: string) {
      const postIndex = this.posts.findIndex((post) => post.id == postId);
      if (postIndex >= 0) {
        this.posts.splice(postIndex, 1);
      }
    }
  },

  async created() {
    await this.fetchPosts();
  }
});
</script>

<style scoped></style>
