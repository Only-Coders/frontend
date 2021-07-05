<template>
  <v-dialog :value="value" @input="close" width="auto" max-width="460">
    <v-card class="add-admin">
      <v-row no-gutters align="center" justify="center" class="mt-8">
        <v-col cols="auto">
          <v-icon size="75" color="#ee5e5e">mdi-alert-circle-outline</v-icon>
        </v-col>
      </v-row>
      <v-card-text class="text-center px-16 mt-8">
        {{ $i18n.t("backofficeListUsers.deleteTextBeginning") }}
        <span class="font-weight-regular">{{ userFirstName }} {{ userLastName }} ?</span>
      </v-card-text>

      <v-card-text class="text-center">
        {{ $i18n.t("backofficeListUsers.deleteTextEnd") }}
      </v-card-text>

      <div class="pb-1 pt-4 mr-2">
        <v-card-actions class="mt-2 justify-end">
          <v-btn depressed text @click="close">{{ $i18n.t("cancel") }}</v-btn>
          <v-btn depressed dark color="#ee5e5e" :loading="isLoading" @click="deleteUser">{{
            $i18n.t("backofficeListUsers.delete")
          }}</v-btn>
        </v-card-actions>
      </div>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import Vue, { VueConstructor } from "vue";
import notificationsMixin, { NotificationMixin } from "@/mixins/notifications";
import { deleteUser } from "@/services/user";

export default (Vue as VueConstructor<Vue & NotificationMixin>).extend({
  name: "DeleteUser",
  mixins: [notificationsMixin],
  props: {
    value: Boolean,
    userFirstName: String,
    userLastName: String,
    userCanonicalName: String
  },
  data: () => ({
    isLoading: false
  }),
  methods: {
    close(): void {
      this.$emit("input");
    },
    async deleteUser() {
      try {
        this.isLoading = true;
        await deleteUser(this.userCanonicalName);
        this.$emit("deleteUser");
        this.success("", this.$i18n.t("backofficeListUsers.notification").toString(), 3000);
        this.close();
      } catch (error) {
        console.log(error);
      } finally {
        this.isLoading = false;
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
