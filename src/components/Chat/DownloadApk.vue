<template>
  <v-container fluid class="container">
    <v-row no-gutters justify="center" align="center">
      <v-col class="text-center">
        <v-img class="mx-auto mb-4" src="@/assets/images/apk-image.png" max-width="128"></v-img>
        <h2>{{ $i18n.t("apkTitle") }}</h2>
        <p>
          {{ $i18n.t("apkMessage") }}
        </p>
        <v-btn color="indigo" dark href="https://onlycoders.tech/app.apk">
          <v-img class="mr-2" src="@/assets/images/android.png" max-width="32"></v-img>
          <span>{{ $i18n.t("apkButton") }}</span>
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "DownloadApk"
});
</script>

<style scoped>
.container {
  height: calc(100vh - 56px);
}

.container > div {
  height: 100%;
}
</style>
