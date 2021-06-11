<template>
  <div>
    <v-app-bar app color="navbar" dark>
      <v-spacer></v-spacer>
      <v-btn icon class="mr-2" @click="openAddAdmin">
        <v-icon>mdi-account-plus</v-icon>
      </v-btn>
    </v-app-bar>
    <new-admin v-model="showAddAdmin"></new-admin>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import NewAdmin from "@/components/Admin/NewAdmin.vue";

export default Vue.extend({
  name: "AdminHeader",

  components: {
    NewAdmin
  },

  data: () => ({
    showAddAdmin: false
  }),

  methods: {
    openAddAdmin() {
      this.showAddAdmin = !this.showAddAdmin;
    }
  }
});
</script>

<style scoped></style>
