<template>
  <div class="item">
    <p class="item__text" id="texto">{{ $props.message }}</p>
    <v-row no-gutters>
      <v-col cols="12" md="4" class="text-center">Columna</v-col>
      <v-col cols="12" md="4" class="text-center">Columna</v-col>
      <v-col cols="12" md="4" class="text-center">Columna</v-col>
    </v-row>
    <slot />
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "Item",

  props: {
    message: {
      type: String
    }
  }
});
</script>

<style lang="scss" scoped></style>
