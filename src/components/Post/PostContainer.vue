<template>
  <div>
    <CreatePost
      v-if="showCreateProfile"
      @passPostToPostContainer="addPostToFeed"
      :isSelfProfile="isLoguedUserProfile"
      :userData="userInfo"
      :class="$route.name === 'ProfileChild' ? 'mx-10' : ''"
    />

    <v-divider class="mt-8 mx-4 mx-md-8"></v-divider>

    <v-col cols="12" align="center" v-if="fetching">
      <v-progress-circular align="center" indeterminate color="primary" class="my-12"></v-progress-circular>
    </v-col>

    <div v-else v-for="post in posts" :key="post.id" class="mb-10 mt-8">
      <Post
        :post="post"
        @passDeletedPostAsFavorite="passDeletedPostAsFavorite"
        :isInFavoritesTab="isInFavoritesTab"
        @deletePost="deletePost"
        :class="$route.name === 'ProfileChild' ? 'mx-10' : ''"
      />
    </div>

    <div v-if="!fetching && posts.length == 0">
      <v-row justify="center" class="mt-8" no-gutters>
        <v-col cols="3">
          <v-img src="@/assets/images/no_data.svg" width="100%" alt="no data"></v-img>
        </v-col>
      </v-row>
      <v-row justify="center">
        <v-col cols="12" class="text-center">
          <span>{{ $i18n.t("Onboarding.Shared.noData") }}</span>
        </v-col>
      </v-row>
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
