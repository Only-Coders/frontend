<template>
  <div>
    <v-app-bar app color="navbar" dark>
      <v-row align="center" justify="space-between" no-gutters class="mx-2">
        <v-col cols="3" class="hidden-sm-and-down">
          <v-img
            alt="OnlyCoders logo"
            class="shrink ml-md-0 ml-lg-16 feed_link"
            contain
            src="@/assets/images/only-coders-logo-side-text.png"
            transition="scale-transition"
            width="140"
            @click="$router.push('/admin')"
          />
        </v-col>
        <v-col cols="auto">
          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-btn icon class="mr-5" @click="$router.push('/admin')" v-bind="attrs" v-on="on">
                <v-icon>mdi-home-variant</v-icon>
              </v-btn>
            </template>
            <span>{{ $i18n.t("Header.home") }}</span>
          </v-tooltip>

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
              <v-btn icon class="mr-5" @click="$router.push('/users')" v-bind="attrs" v-on="on">
                <v-icon>mdi-format-list-bulleted</v-icon>
              </v-btn>
            </template>
            <span>{{ $i18n.t("Header.list") }}</span>
          </v-tooltip>

          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-btn icon class="mr-2" @click="logout" v-bind="attrs" v-on="on">
                <v-icon>mdi-logout-variant</v-icon>
              </v-btn>
            </template>
            <span>{{ $i18n.t("Header.logout") }}</span>
          </v-tooltip>
        </v-col>
      </v-row>
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

<style scoped>
.feed_link {
  cursor: pointer;
}
</style>
