<template>
  <div>
    <CreatePost />

    <div v-for="(post, index) in posts" :key="index">
      <Post :postData="post" />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import CreatePost from "./CreatePost.vue";
import Post from "./Post.vue";

export default Vue.extend({
  name: "PostContainer",

  components: { CreatePost, Post },

  data: () => ({
    posts: []
  })
});
</script>

<style scoped></style>
