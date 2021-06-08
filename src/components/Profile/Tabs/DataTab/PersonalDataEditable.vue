<template>
  <v-row class="mt-6 px-16 ml-16 main-container" align="center" no-gutters>
    <span class="pl-16 pr-4">
      <v-icon size="28"> {{ icon }} </v-icon>
    </span>
    <v-hover v-slot="{ hover }">
      <v-text-field
        :value="text"
        :label="label"
        class="px-4 text"
        :class="{ 'on-hover': hover }"
        :readonly="!editEnabled"
        :solo="!editEnabled"
        :flat="!editEnabled"
        :append-icon="hover && !editEnabled ? 'mdi-pencil' : ''"
        :append-outer-icon="!editEnabled ? '' : 'mdi-content-save'"
        @click:append="enableEditMode"
        @click:append-outer="updateUser"
        hide-details
      >
      </v-text-field>
    </v-hover>
  </v-row>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "PersonalDataEditable",

  props: { originalValue: String, label: String, icon: String },

  data: () => ({
    editEnabled: false,
    text: ""
  }),

  methods: {
    enableEditMode() {
      this.editEnabled = !this.editEnabled;
    },
    updateUser() {
      if (this.text && this.text != this.originalValue) {
        console.log("Usuario actualizado");
        this.enableEditMode();
      } else {
        this.text = this.originalValue;
        console.log("No se cambió una mierda");
      }
    }
  },

  created() {
    this.text = this.originalValue;
  }
});
</script>

<style scoped>
/* .on-hover {} */
.main-container {
  width: 900px !important;
}
</style>
