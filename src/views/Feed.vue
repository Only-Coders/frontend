<template>
  <div>
    <v-row class="mt-4 mt-md-14" no-gutters>
      <v-col cols="3" sm="3" lg="3" class="hidden-sm-and-down ml-16 px-16">
        <FeedProfilePreview></FeedProfilePreview>
      </v-col>

      <v-col cols="12" md="5">
        <PostContainer
          :fetching="fetching"
          :posts="posts"
          :showCreateProfile="true"
          :isLoguedUserProfile="true"
          @deletePost="deleteUserPost"
        ></PostContainer>
      </v-col>
      <v-col cols="3" class="hidden-sm-and-down pl-16 pr-8">
        <Suggestions style="position: fixed"></Suggestions>
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
    enableInfiniteScroll: false,
    fetching: true
  }),

  methods: {
    async fetchPosts() {
      this.fetching = true;
      const result = await getPost(this.currentPage, 5);
      this.currentPage++;
      this.posts = result.content;
      if (result.totalElements !== 0) {
        this.enableInfiniteScroll = true;
      }
      this.fetching = false;
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
  },

  computed: {
    search: {
      get(): boolean {
        return this.$store.state.shouldRefreshFeed;
      }
    }
  },
  watch: {
    async search(newValue: boolean) {
      if (newValue) {
        this.posts = [];
        this.currentPage = 0;
        this.enableInfiniteScroll = false;
        await this.fetchPosts();
      }
      this.$store.commit("shouldRefreshFeed", false);
    }
  }
});
</script>

<style scoped></style>
