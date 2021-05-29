<template>
  <div>
    <v-row class="mt-14" no-gutters>
      <v-col cols="2 offset-1" sm="3" lg="2" class="hidden-sm-and-down">
        <ProfilePreview></ProfilePreview>

        <Suggestions class="mt-16"></Suggestions>
      </v-col>

      <v-col cols="10 offset-1" md="5">
        <PostContainer></PostContainer>
      </v-col>
    </v-row>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import ProfilePreview from "@/components/Feed/ProfilePreview.vue";
import Suggestions from "@/components/Feed/Suggestions.vue";
import PostContainer from "@/components/Post/PostContainer.vue";

export default Vue.extend({
  name: "Feed",

  components: { ProfilePreview, Suggestions, PostContainer }
});
</script>

<style scoped></style>
