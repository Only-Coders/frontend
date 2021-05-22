<template>
  <v-row justify="center">
    <v-col cols="2">
      <v-card max-width="220">
        <div class="profile__banner">
          <v-avatar size="90" class="profile__banner__avatar">
            <v-img alt="user" src="https://cdn.pixabay.com/photo/2020/06/24/19/12/cabbage-5337431_1280.jpg" />
          </v-avatar>
        </div>
        <v-row class="pt-16" justify="center">
          <v-card-title class="pt-2">Mateo Sayas</v-card-title>
          <v-card-subtitle><p align="center">Front-end developer en Kaizen Softworks</p></v-card-subtitle>
        </v-row>
        <v-row justify="center"> MEDALS </v-row>
        <v-row justify="center">
          <v-card-title class="pb-2">503</v-card-title>
        </v-row>
        <p class="pt-0" align="center">publicaciones</p>
        <v-row>
          <v-col cols="6" class="pl-6">
            <v-row justify="center">
              <v-card-title class="pb-2">145</v-card-title>
            </v-row>
            <p class="pt-0" align="center">seguidores</p>
          </v-col>
          <v-col cols="6" class="pr-6">
            <v-row justify="center">
              <v-card-title class="pb-2">27</v-card-title>
            </v-row>
            <p class="pt-0" align="center">seguidos</p>
          </v-col>
        </v-row>
        <v-row justify="center" class="pb-2">
          <v-btn text color="secondary" class="v-btn__content" @click="showAddDialog"> ver perfil </v-btn>
        </v-row>
      </v-card>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "Profile",

  props: {},

  data: () => ({})
});
</script>

<style lang="scss" scoped>
.profile__banner {
  position: relative;
  background: #00cdae;
  height: 70px;
  display: flex;
  justify-content: center;
}
.profile__banner__avatar {
  position: absolute;
  top: 30px;
}
.v-btn__content {
  text-transform: lowercase !important;
  font-weight: bold !important;
  font-size: 18px !important;
}
</style>
