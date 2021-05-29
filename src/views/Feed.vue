<template>
  <div>
    <v-row class="mt-14" no-gutters>
      <v-col cols="2 offset-1" sm="3" lg="2" class="hidden-sm-and-down">
        <Profile></Profile>

        <Suggestions class="mt-16"></Suggestions>
      </v-col>

      <v-col cols="10 offset-1" md="5">
        <PostContainer></PostContainer>

        <div v-if="posts.length === 0">
          <h1>No posts yet :(</h1>
        </div>
        <div v-else v-for="(post, index) in posts" :key="index" class="mt-16">
          <ViewPost :post="post"></ViewPost>
        </div>
      </v-col>
    </v-row>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Profile from "@/components/Feed/Profile.vue";
import Suggestions from "@/components/Feed/Suggestions.vue";
import PostContainer from "@/components/Post/PostContainer.vue";
import ViewPost from "@/components/Post/ViewPost.vue";
import { getPost } from "@/services/post";
import { GetPost } from "@/models/post";

export default Vue.extend({
  name: "Feed",

  components: { Profile, Suggestions, PostContainer, ViewPost },

  data: () => ({
    posts: {} as GetPost[]
  }),

  methods: {
    async fetchPosts() {
      const result = await getPost();
      this.posts = result.content;
    }
  },

  async created() {
    await this.fetchPosts();
    console.log("posts: ", this.posts);
  }
});
</script>

<style scoped></style>
