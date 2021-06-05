<template>
  <div>
    <CreatePost
      v-if="showCreateProfile"
      @passPostToPostContainer="addPostToFeed"
      :isSelfProfile="isLoguedUserProfile"
      :userData="userInfo"
    />

    <div v-for="post in posts" :key="post.id" class="my-16">
      <Post :post="post" @passDeletedPostAsFavorite="passDeletedPostAsFavorite" :isInFavoritesTab="isInFavoritesTab" />
    </div>
  </div>
</template>

<script lang="ts">
import Vue, { PropType } from "vue";
import CreatePost from "./CreatePost.vue";
import Post from "./Post.vue";
import { GetPost } from "@/models/post";
import { Profile } from "@/models/profile";

export default Vue.extend({
  name: "PostContainer",

  components: {
    CreatePost,
    Post
  },

  props: {
    posts: Array as PropType<GetPost[]>,
    showCreateProfile: Boolean,
    isInFavoritesTab: Boolean,
    isLoguedUserProfile: Boolean,
    userInfo: Object as PropType<Profile>
  },

  methods: {
    addPostToFeed(post: GetPost) {
      this.posts.unshift(post);
    },
    passDeletedPostAsFavorite(postId: string) {
      this.$emit("passDeletedPost", postId);
    }
  }
});
</script>

<style scoped></style>
