<template>
  <v-row justify="center" class="py-1" style="max-width: 220px">
    <v-col cols="2" class="pa-0 pl-1">
      <v-avatar size="50">
        <v-img alt="user" :src="imageURI ? imageURI : require('@/assets/images/default-avatar.png')" />
      </v-avatar>
    </v-col>

    <v-col class="pa-0 pl-4">
      <v-card-title class="font-weight-light subtitle-2"> {{ firstName }} {{ lastName }} </v-card-title>
      <v-card-text class="text-start font-weight-thin">
        {{ currentPosition != null ? currentPosition.position : "" }}
      </v-card-text>
    </v-col>
    <v-col class="pa-0 px-2" cols="1">
      <v-btn absolute icon small @click="closeSuggestedContact">
        <v-icon size="20"> mdi-close </v-icon>
      </v-btn>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import Vue, { PropType } from "vue";
import { CurrentPosition } from "@/models/currentPosition";

export default Vue.extend({
  name: "Contact",
  props: {
    firstName: String,
    lastName: String,
    imageURI: String,
    canonicalName: String,
    currentPosition: Object as PropType<CurrentPosition>
  },

  data: () => ({
    contactRequestSended: false,
    followed: false
  }),

  methods: {
    closeSuggestedContact() {
      this.$emit("remove");
    }
  }
});
</script>

<style scoped></style>
