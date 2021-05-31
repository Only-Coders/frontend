<template>
  <div>
    <CreatePost />

    <div v-if="posts.length === 0">
      <h1>No posts yet :(</h1>
    </div>
    <div v-else v-for="(post, index) in $props.posts" :key="index" class="my-16">
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

  props: { posts: Object as PropType<GetPost> },

  data: () => ({
    posts: []
  })
});
</script>

<style scoped></style>
