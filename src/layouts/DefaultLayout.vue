<template>
  <div>
    <v-main>
      <router-view />
    </v-main>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "DefaultLayout"
});
</script>
