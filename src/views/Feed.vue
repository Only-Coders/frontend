<template>
  <div>
    <v-row class="pt-16">
      <v-col cols="4">
        <v-row>
          <Profile></Profile>
        </v-row>
        <v-row class="pt-16">
          <Suggestions></Suggestions>
        </v-row>
      </v-col>
    </v-row>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Profile from "@/components/Feed/Profile.vue";
import Suggestions from "@/components/Feed/Suggestions.vue";

export default Vue.extend({
  name: "Feed",
  components: { Profile, Suggestions }
});
</script>

<style scoped></style>
