<template>
  <div>
    <v-icon> mdi-file </v-icon>
    <p>{{ name }}</p>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "FileType",

  props: { name: String }
});
</script>

<style scoped></style>
