<template>
  <div class="no-messages">
    <div>
      <v-img src="@/assets/images/no-messages.svg" width="250" contain></v-img>
      <p class="text-center pt-6">{{ $i18n.t("Chat.noMessages") }}</p>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "NoMessages"
});
</script>

<style scoped>
.no-messages {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
}
</style>
