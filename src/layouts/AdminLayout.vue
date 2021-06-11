<template>
  <div class="main">
    <admin-header></admin-header>

    <v-main>
      <router-view />
    </v-main>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import AdminHeader from "@/components/Layout/AdminHeader.vue";

export default Vue.extend({
  name: "AdminLayout",

  components: { AdminHeader }
});
</script>
<style scoped>
.main {
  overflow: hidden;
  height: 100%;
  background: #f4f4f4;
}
</style>
