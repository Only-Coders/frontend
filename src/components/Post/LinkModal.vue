<template>
  <v-dialog :value="value" @input="close" max-width="600px">
    <v-card>
      <v-card-title>
        <span>{{ $i18n.t("CreatePost.InsertLink") }}</span>
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-row>
            <v-text-field autocomplete="off" v-model="link"></v-text-field>
          </v-row>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="primary" class="mx-3 mb-3" small outlined width="90px" @click="close">
          {{ $i18n.t("cancel") }}
        </v-btn>
        <v-btn
          color="primary"
          class="mx-3 mb-3"
          small
          depressed
          width="90px"
          @click="addLink"
          :disabled="!validURL(link)"
        >
          {{ $i18n.t("unblock") }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import Vue from "vue";
import { VueConstructor } from "vue/types/umd";
import commonMethodsMixin, { CommonMethodsMixin } from "@/mixins/commonMethods";

export default (Vue as VueConstructor<Vue & CommonMethodsMixin>).extend({
  name: "LinkModal",

  mixins: [commonMethodsMixin],

  props: { value: Boolean },

  data: () => ({
    dialog: false,
    link: ""
  }),

  methods: {
    addLink() {
      this.dialog = false;
      this.$emit("addLink", this.link);
      this.close();
    },
    close() {
      this.$emit("input");
    }
  }
});
</script>

<style scoped></style>
