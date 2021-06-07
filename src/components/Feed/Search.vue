<template>
  <!-- <v-overlay :value="showOverlay"> -->
  <v-card height="300">
    <v-row>
      <v-col>
        <v-card-title class="pt-4 pl-6 font-weight-light">Recent</v-card-title>
      </v-col>
      <v-col>
        <v-btn>Borrar</v-btn>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="2">
        <v-img alt="user" :src="require('@/assets/images/default-avatar.png')" />
        <h3>Mateo</h3>
        <h3>Sayas</h3>
      </v-col>
    </v-row>
    <v-row class="d-flex flex-row-reverse">
      <v-col cols="2">
        <v-btn>Ver todos</v-btn>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-card-title class="pt-4 pl-6 font-weight-light">Try</v-card-title>
      </v-col>
      <v-col>
        <v-list>
          <v-list-item>
            <v-list-item-icon>mdi-pound</v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>javascript</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-col>
    </v-row>
  </v-card>
  <!-- </v-overlay> -->
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "Search",

  data: () => ({
    search: "",
    showOverlay: true
  }),

  methods: {}
});
</script>

<style lang="scss" scoped></style>
