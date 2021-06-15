<template>
  <v-dialog :value="value" @input="close" width="auto" transition="dialog-top-transition" max-width="550">
    <v-toolbar color="primary" dark>
      <h2 class="ml-4">{{ $i18n.t("searchFilters") }}</h2>
      <v-spacer></v-spacer>
      <v-btn class="mr-2 mt-1" icon @click="close">
        <v-icon size="27"> mdi-close </v-icon>
      </v-btn>
    </v-toolbar>

    <v-card class="px-6 pt-8">
      <v-card-text class="mb-0 pb-0">
        <div>
          <v-text-field v-model="country" placeholder="Country" v-bind="{ ...inputProps }"></v-text-field>
          <v-text-field v-model="skill" placeholder="Skill" v-bind="{ ...inputProps }"></v-text-field>
        </div>
      </v-card-text>

      <v-card-actions class="mt-3">
        <v-spacer></v-spacer>

        <v-btn color="error" text @click="close"> {{ $i18n.t("cancel") }} </v-btn>

        <v-btn color="primary" text class="ml-6" @keydown.enter.prevent="applyFilters" @click="applyFilters">
          {{ $i18n.t("apply") }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import Vue, { VueConstructor } from "vue";
import inputPropsMixin, { InputPropsMixin } from "@/mixins/inputProps";

export default (Vue as VueConstructor<Vue & InputPropsMixin>).extend({
  name: "UserSearchFiltersDialog",

  mixins: [inputPropsMixin],

  props: { value: Boolean },

  data: () => ({
    country: "",
    skill: ""
  }),

  methods: {
    applyFilters() {
      this.$store.commit("userPaginationModule/SET_COUNTRY", this.country);
      this.$store.commit("userPaginationModule/SET_SKILL", this.skill);
      this.$emit("applyFilters");
      this.close();
    },
    close() {
      this.$emit("input");
    }
  },

  created() {
    this.country = this.$store.state.userPaginationModule.country;
    this.skill = this.$store.state.userPaginationModule.skill;
  }
});
</script>

<style scoped></style>
