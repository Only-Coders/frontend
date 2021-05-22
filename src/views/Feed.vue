<template>
  <div>
    <Profile></Profile>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Profile from "@/components/Feed/Profile.vue";

export default Vue.extend({
  name: "Feed",
  components: { Profile }
});
</script>

<style scoped></style>
