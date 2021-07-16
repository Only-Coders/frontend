<template>
  <div class="main">
    <Header></Header>

    <v-main>
      <router-view />
    </v-main>
    <BottomNavigation v-if="isOnMobile"></BottomNavigation>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Header from "@/components/Layout/Header.vue";
import BottomNavigation from "@/components/Layout/BottomNavigation.vue";

export default Vue.extend({
  name: "HeaderLayout",

  components: { Header, BottomNavigation },

  computed: {
    isOnMobile: {
      get(): boolean {
        return this.$vuetify.breakpoint.xsOnly;
      }
    }
  }
});
</script>
<style scoped>
.main {
  overflow: hidden;
  height: 100%;
  background: #f4f4f4;
}
</style>
