<template>
  <div>
    <div>
      <v-btn class="btn_cross ml-8" fab color="secondary" @click="deleteFile">
        <v-icon size="10" color="white"> mdi-close </v-icon>
      </v-btn>
    </div>
    <div>
      <v-icon size="35"> mdi-file </v-icon>
      <p class="mb-0">{{ name }}</p>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "FileType",

  props: { name: String },

  methods: {
    deleteFile() {
      this.$emit("deleteFile");
    }
  }
});
</script>

<style scoped>
.btn_cross {
  color: white;
  width: 20px !important;
  height: 20px !important;
}
</style>
