<template>
  <v-dialog :value="value" @input="close" width="auto" max-width="450">
    <v-card class="add-admin">
      <v-card-title class="justify-center">{{ $i18n.t("addBlacklistUser") }}</v-card-title>
      <v-card-text class="text-center px-16 mt-6">
        <v-form ref="add-blacklistUser" lazy-validation>
          <v-text-field
            v-model="blacklistUserEmail"
            :rules="[rules.required]"
            v-bind="{ ...inputProps }"
            :label="$i18n.t('email')"
          ></v-text-field>
        </v-form>
      </v-card-text>

      <v-card-actions class="mt-2 justify-end">
        <v-btn depressed text @click="close">{{ $i18n.t("cancel") }}</v-btn>
        <v-btn depressed color="primary" :loading="isLoading" @click="addUserToBlacklist">{{ $i18n.t("add") }}</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import Vue, { VueConstructor } from "vue";
import ruleMixin, { RuleMixin } from "@/mixins/rules";
import inputPropsMixin, { InputPropsMixin } from "@/mixins/inputProps";
import notificationsMixin, { NotificationMixin } from "@/mixins/notifications";
import { postUserToBlacklist } from "@/services/blacklist";

export default (Vue as VueConstructor<Vue & NotificationMixin & RuleMixin & InputPropsMixin>).extend({
  name: "NewBlacklistUser",

  mixins: [inputPropsMixin, ruleMixin, notificationsMixin],

  props: {
    value: Boolean
  },

  data: () => ({
    isLoading: false,
    blacklistUserEmail: ""
  }),

  methods: {
    close(): void {
      this.$emit("input");
    },
    async addUserToBlacklist() {
      if ((this.$refs["add-blacklistUser"] as HTMLFormElement).validate()) {
        try {
          this.isLoading = true;
          await postUserToBlacklist(this.blacklistUserEmail);
          this.success("", this.$i18n.t("addNotification").toString(), 3000);
          this.close();
        } catch (error) {
          console.log(error);
        } finally {
          this.isLoading = false;
        }
      }
    }
  }
});
</script>

<style scoped>
.add-admin {
  border-top: 4px solid var(--v-primary-base);
}
</style>
