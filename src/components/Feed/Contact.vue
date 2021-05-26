<template>
  <v-list-item class="pr-0">
    <v-list-item-avatar size="55">
      <v-img alt="user" :src="imageURI ? imageURI : require('@/assets/images/default-avatar.png')" />
    </v-list-item-avatar>

    <v-list-item-content>
      <v-list-item-title>
        <h3 class="pa-0 font-weight-light text-truncate">{{ firstName }} {{ lastName }}</h3>
      </v-list-item-title>

      <v-list-item-subtitle>
        <h4 class="pa-0 pt-1 font-weight-light">
          {{ currentPosition != null ? currentPosition.position : "" }}
        </h4>
      </v-list-item-subtitle>
    </v-list-item-content>

    <v-list-item-action class="ma-0">
      <v-btn icon @click="closeSuggestedContact">
        <v-icon size="18">mdi-close</v-icon>
      </v-btn>
    </v-list-item-action>
  </v-list-item>
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
