<template>
  <v-row no-gutters class="mb-4 d-flex align-center">
    <v-col cols="auto" class="d-flex flex-column align-center">
      <v-avatar size="50">
        <v-img
          alt="user"
          class="mb-2"
          :src="contactData.imageURI ? contactData.imageURI : require('@/assets/images/default-avatar.png')"
        />
      </v-avatar>
    </v-col>
    <v-col cols="auto">
      <v-card-title class="font-weight-light py-0 pr-2 contact__canonical-name"
        ><h5 class="font-weight-light">{{ contactData.firstName }} {{ contactData.lastName }}</h5></v-card-title
      >
    </v-col>
    <v-col cols="auto">
      <v-icon color="#737373" size="25">mdi-circle-small</v-icon>
    </v-col>
    <v-col cols="auto">
      <v-card-title class="font-weight-light py-0 pl-2"
        ><h6 class="font-weight-light text--secondary">
          {{ contactData.currentPosition ? contactData.currentPosition.position : "" }}
          {{ contactData.currentPosition && $i18n.t("at") }}
          {{
            contactData.currentPosition && contactData.currentPosition.workplace
              ? contactData.currentPosition.workplace.name
              : ""
          }}
        </h6></v-card-title
      >
    </v-col>
  </v-row>
</template>

<script lang="ts">
import Vue, { PropType } from "vue";
import { User } from "@/models/user";

export default Vue.extend({
  name: "Search",

  props: {
    contactData: Object as PropType<User>
  }
});
</script>

<style scoped>
.contact__canonical-name {
  cursor: pointer;
}
</style>
