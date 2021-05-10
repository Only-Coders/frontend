<template>
  <div class="pb-10">
    <v-row justify="center">
      <v-col cols="4">
        <v-img src="@/assets/images/no_data.svg" width="180" alt="no data"></v-img>
      </v-col>
    </v-row>
    <v-row justify="center">
      <v-col cols="6">
        <span>Mmm... Looks like there's no data here</span>
      </v-col>
    </v-row>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "NoData",

  props: {},

  data: () => ({})
});
</script>

<style lang="scss" scoped></style>
