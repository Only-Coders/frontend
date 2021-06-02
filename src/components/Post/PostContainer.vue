<template>
  <div>
    <CreatePost @passPostToPostContainer="addPostToFeed" />

    <div v-for="post in posts" :key="post.id" class="my-16">
      <Post :post="post" />
    </div>
  </div>
</template>

<script lang="ts">
import Vue, { PropType } from "vue";
import CreatePost from "./CreatePost.vue";
import Post from "./Post.vue";
import { GetPost } from "@/models/post";

export default Vue.extend({
  name: "PostContainer",

  components: {
    CreatePost,
    Post
  },

  props: { posts: Array as PropType<GetPost[]> },

  methods: {
    addPostToFeed(post: GetPost) {
      this.posts.unshift(post);
    }
  }
});
</script>

<style scoped></style>
