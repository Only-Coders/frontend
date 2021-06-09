<template>
  <div>
    <CreatePost
      v-if="showCreateProfile"
      @passPostToPostContainer="addPostToFeed"
      :isSelfProfile="isLoguedUserProfile"
      :userData="userInfo"
    />

    <v-col cols="12" align="center" v-if="fetching">
      <v-progress-circular align="center" indeterminate color="primary" class="my-12"></v-progress-circular>
    </v-col>
    <div v-else v-for="post in posts" :key="post.id" class="my-16">
      <Post
        :post="post"
        @passDeletedPostAsFavorite="passDeletedPostAsFavorite"
        :isInFavoritesTab="isInFavoritesTab"
        @deletePost="deletePost"
      />
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
    userInfo: Object as PropType<Profile>,
    fetching: Boolean
  },

  methods: {
    addPostToFeed(post: GetPost) {
      this.posts.unshift(post);
    },
    passDeletedPostAsFavorite(postId: string) {
      this.$emit("passDeletedPost", postId);
    },
    deletePost(postId: string) {
      this.$emit("deletePost", postId);
    }
  }
});
</script>

<style scoped></style>
