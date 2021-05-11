<template>
  <div>
    <v-row justify="center">
      <v-col cols="4" sm="3" md="3" lg="2">
        <v-img src="@/assets/images/no_data.svg" width="220" alt="no data"></v-img>
      </v-col>
    </v-row>
    <v-row justify="center">
      <v-col cols="6" sm="8" md="6" lg="2" class="text-center">
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
