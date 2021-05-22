<template>
  <component :is="layout"> </component>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "AppLayout",

  computed: {
    layout: {
      get() {
        const layout = this.$route.meta.layout || "DefaultLayout";
        return () => import(`@/layouts/${layout}.vue`);
      }
    }
  }
});
</script>
