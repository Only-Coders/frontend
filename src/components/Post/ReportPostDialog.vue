<template>
  <v-dialog :value="value" @input="close" width="auto" transition="dialog-top-transition" max-width="650">
    <v-toolbar color="primary" dark>
      <h2 class="ml-4">{{ $i18n.t("postReportDialog") }}</h2>
      <v-spacer></v-spacer>
      <v-btn class="mr-2 mt-1" icon @click="close">
        <v-icon size="27"> mdi-close </v-icon>
      </v-btn>
    </v-toolbar>

    <v-card class="px-6">
      <v-form ref="report-post">
        <v-card-text>
          <v-radio-group v-model="selectedReportTypeId" :rules="[rules.required]">
            <v-radio
              v-for="reportType in reportOptions"
              :key="reportType.id"
              :label="reportType.name"
              :value="reportType.id"
              class="pb-4"
            ></v-radio>
          </v-radio-group>

          <v-textarea
            v-model="reason"
            rounded
            filled
            :label="$i18n.t('postReason')"
            background-color="grey_input"
            rows="4"
            row-height="30"
            counter
            no-resize
            maxlength="256"
            class="mt-5"
          ></v-textarea>
        </v-card-text>

        <v-card-actions class="mt-4">
          <v-spacer></v-spacer>

          <v-btn color="error" text @click="close"> {{ $i18n.t("cancel") }} </v-btn>

          <v-btn color="primary" text class="ml-6" @click="sendReport" :loading="isLoading">
            {{ $i18n.t("report") }}
          </v-btn>
        </v-card-actions>
      </v-form>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import Vue, { VueConstructor } from "vue";
import { getPostReportTypes, addPostReport } from "@/services/report";
import { PostReportType, PostReport } from "@/models/postReport";
import ruleMixin, { RuleMixin } from "@/mixins/rules";

export default (Vue as VueConstructor<Vue & RuleMixin>).extend({
  name: "ReportPostDialog",

  mixins: [ruleMixin],

  props: { value: Boolean, postId: String },

  data: () => ({
    checkbox: false,
    reportOptions: [] as PostReportType[],
    selectedReportTypeId: "",
    reason: "",
    isLoading: false
  }),

  methods: {
    close() {
      this.$emit("input");
    },
    async sendReport() {
      if ((this.$refs["report-post"] as HTMLFormElement).validate()) {
        if (this.selectedReportTypeId) {
          this.isLoading = true;
          await addPostReport(this.postId, { reason: this.reason, typeID: this.selectedReportTypeId } as PostReport);

          this.close();
        }
      }
    }
  },

  async created() {
    this.reportOptions = await getPostReportTypes(this.$store.state.userModule.user.language);
  }
});
</script>

<style scoped></style>
