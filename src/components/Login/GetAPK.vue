<template>
  <v-card dark flat class="get-apk" href="https://onlycoders.tech/app.apk">
    <v-card-text class="d-flex pa-0">
      <v-img max-width="42" class="mr-2" src="@/assets/images/android.png"></v-img>
      <span class="get-apk__text">{{ $i18n.t("apkDownload") }}</span>
    </v-card-text>
  </v-card>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "GetAPK"
});
</script>

<style scoped lang="scss">
.get-apk {
  position: fixed;
  padding: 0.75rem;
  bottom: 15px;
  right: 15px;
  cursor: pointer;
  border-bottom-right-radius: 0px !important;
  background: #00000085 !important;
  transition: all 0.3s;

  &:hover {
    background: #00000095 !important;
  }

  .get-apk__text {
    color: #fff;
    font-weight: bold;
    font-size: 12px;
    display: flex;
    align-items: flex-end;
    font-family: monospace;
  }
}

@media only screen and (max-width: 600px) {
  .get-apk {
    padding: 0.5rem;
    bottom: 5px;
    right: 5px;
  }
}
</style>
