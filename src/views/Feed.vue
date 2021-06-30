<template>
  <div>
    <v-row class="mt-10 mt-md-14 justify-sm-center justify-md-start" no-gutters>
      <v-col cols="3" class="hidden-sm-and-down ml-6 pr-10 ml-lg-16 pr-lg-14 pl-lg-12">
        <FeedProfilePreview></FeedProfilePreview>
      </v-col>

      <v-col cols="12" sm="10" md="5" lg="5">
        <PostContainer
          :fetching="fetching"
          :posts="posts"
          :showCreateProfile="true"
          :isLoguedUserProfile="true"
          @deletePost="deleteUserPost"
        ></PostContainer>
      </v-col>
      <v-col cols="3" class="hidden-sm-and-down pl-14">
        <v-alert
          border="left"
          color="orange"
          prominent
          text
          type="warning"
          icon="mdi-alert-outline"
          v-if="$store.state.userModule.user.eliminationDate"
          >{{ $i18n.t("Feed.deletedAccountDate") }} {{ accountEliminationDate }}</v-alert
        >

        <Suggestions></Suggestions>
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
import { getPost, getTagPosts } from "@/services/post";
import { GetPost } from "@/models/post";
import { Pagination } from "@/models/Pagination/pagination";
import { format } from "date-fns";

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
      const tag = this.$route.query.tag as string;
      let result: Pagination<GetPost>;
      if (tag) {
        result = await getTagPosts(this.currentPage, 5, tag);
      } else {
        result = await getPost(this.currentPage, 5);
      }
      this.currentPage++;
      this.posts = result.content;
      if (result.totalElements !== 0) {
        this.enableInfiniteScroll = true;
      }
      this.fetching = false;
    },

    async loadMore($state: { loaded: () => void; complete: () => void }) {
      setTimeout(async () => {
        const tag = this.$route.query.tag as string;
        let result: Pagination<GetPost>;
        if (tag) {
          result = await getTagPosts(this.currentPage, 5, tag);
        } else {
          result = await getPost(this.currentPage, 5);
        }
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
    },
    accountEliminationDate: {
      get(): string | null {
        return format(new Date(this.$store.state.userModule.user.eliminationDate), "dd/MM/yyyy");
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
