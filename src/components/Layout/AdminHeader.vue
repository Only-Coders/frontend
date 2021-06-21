<template>
  <div>
    <v-app-bar app color="navbar" dark>
      <v-spacer></v-spacer>
      <v-tooltip bottom>
        <template v-slot:activator="{ on, attrs }">
          <v-btn icon class="mr-5" @click="openAddAdmin" v-bind="attrs" v-on="on">
            <v-icon>mdi-account-plus</v-icon>
          </v-btn>
        </template>
        <span>{{ $i18n.t("Header.addAdmin") }}</span>
      </v-tooltip>

      <v-tooltip bottom>
        <template v-slot:activator="{ on, attrs }">
          <v-btn icon class="mr-2" @click="logout" v-bind="attrs" v-on="on">
            <v-icon>mdi-logout-variant</v-icon>
          </v-btn>
        </template>
        <span>{{ $i18n.t("Header.logout") }}</span>
      </v-tooltip>
      <v-btn icon class="mr-2" @click="openAddAdmin">
        <v-icon>mdi-account-plus</v-icon>
      </v-btn>
      <v-btn icon class="mr-2" @click="$router.push('/users')">
        <v-icon>mdi-format-list-bulleted</v-icon>
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
    },
    async logout() {
      await this.$store.dispatch("logout");
    }
  }
});
</script>

<style scoped></style>
