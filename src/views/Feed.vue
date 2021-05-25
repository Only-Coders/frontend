<template>
  <div>
    <v-row class="pt-16 hidden-sm-and-down">
      <v-col cols="4">
        <v-row>
          <Profile></Profile>
        </v-row>
        <v-row class="pt-16">
          <Suggestions></Suggestions>
        </v-row>
      </v-col>

      <v-col cols="5 ml-3">
        <PostContainer></PostContainer>
      </v-col>
    </v-row>

  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Profile from "@/components/Feed/Profile.vue";
import Suggestions from "@/components/Feed/Suggestions.vue";
import PostContainer from "@/components/Post/PostContainer.vue";

export default Vue.extend({
  name: "Feed",

  components: { Profile, Suggestions, PostContainer }
});
</script>

<style scoped></style>
