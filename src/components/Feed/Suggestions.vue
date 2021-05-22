<template>
  <v-row justify="center">
    <v-card max-width="220">
      <v-row justify="center">
        <v-card-title class="pt-2">Suggestions</v-card-title>
        <v-btn icon="mdi-dots-vertical"></v-btn>
      </v-row>
      <v-divider></v-divider>
      <v-row justify="center"> </v-row>

      <v-row justify="center" class="pb-2">
        <v-btn text color="primary" class="v-btn__content" @click="showAddDialog"> ver mas </v-btn>
      </v-row>
    </v-card>
  </v-row>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "Suggestions",

  props: {},

  data: () => ({})
});
</script>

<style lang="scss" scoped>
.profile__banner {
  position: relative;
  background: #00cdae;
  height: 70px;
  display: flex;
  justify-content: center;
}
.profile__banner__avatar {
  position: absolute;
  top: 30px;
}
.v-btn__content {
  text-transform: lowercase !important;
  font-weight: bold !important;
  font-size: 14px !important;
}
</style>
