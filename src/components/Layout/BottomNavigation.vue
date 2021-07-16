<template>
  <v-bottom-navigation fixed grow color="primary" class="bottom-navigation">
    <v-btn link :to="{ name: 'Feed' }" exact>
      <span>{{ $i18n.t("Header.home") }}</span>

      <v-icon>mdi-home</v-icon>
    </v-btn>

    <v-btn link :to="{ name: 'Chat' }" exact>
      <span>{{ $i18n.t("Header.chat") }}</span>

      <v-icon>mdi-message-text</v-icon>
    </v-btn>

    <v-btn link :to="{ name: 'ProfileChild', params: { user: userCanonicalName } }" exact>
      <span>{{ $i18n.t("Header.profile") }}</span>

      <v-icon>mdi-account</v-icon>
    </v-btn>
  </v-bottom-navigation>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "BottomNavigation",

  computed: {
    userCanonicalName: {
      get(): string {
        return this.$store.state.userModule.user.canonicalName;
      }
    }
  }
});
</script>

<style scoped>
.bottom-navigation {
  z-index: 10 !important;
}
</style>
