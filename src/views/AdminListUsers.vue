<template>
  <v-tabs vertical>
    <v-tab>Administrators</v-tab>
    <v-tab>Users</v-tab>
    <v-tab-item class="mx-10">
      <v-row no-gutters class="d-flex justify-center">
        <v-col cols="6">
          <v-card class="mt-12" min-height="85vh">
            <UserSearchInput class="pt-4" :searchFunction="searchUsers" :usersPerPage="usersPerPage"></UserSearchInput>
            <v-divider class="mb-6 mx-4 mx-md-8 mt-8"></v-divider>

            <v-row no-gutters class="d-flex justify-center" v-if="userPagination.content.length !== 0">
              <v-col cols="9">
                <div v-for="user in userPagination.content" :key="user.canonicalName" class="my-8">
                  <User :adminData="user"></User>
                </div>
                <v-pagination
                  class="my-10"
                  v-if="userPagination && userPagination.totalPages > 1"
                  v-model="currentPage"
                  :length="userPagination.totalPages"
                  :total-visible="7"
                  @input="nextPage"
                ></v-pagination>
              </v-col>
            </v-row>
            <v-row v-else no-gutters class="d-flex justify-center align-center py-16">
              <v-col cols="9"> <NoData></NoData> </v-col>
            </v-row>
          </v-card>
        </v-col>
      </v-row>
    </v-tab-item>
    <v-tab-item class="mx-10">
      <v-row no-gutters class="d-flex justify-center">
        <v-col cols="6">
          <v-card class="mt-12" min-height="85vh">
            <UserSearchInput class="pt-4" :searchFunction="searchUsers" :usersPerPage="usersPerPage"></UserSearchInput>
            <v-divider class="mb-6 mx-4 mx-md-8 mt-8"></v-divider>

            <v-row no-gutters class="d-flex justify-center" v-if="userPagination.content.length !== 0">
              <v-col cols="9">
                <div v-for="user in userPagination.content" :key="user.canonicalName" class="my-8">
                  <User :userData="user"></User>
                </div>
                <v-pagination
                  class="my-10"
                  v-if="userPagination && userPagination.totalPages > 1"
                  v-model="currentPage"
                  :length="userPagination.totalPages"
                  :total-visible="7"
                  @input="nextPage"
                ></v-pagination>
              </v-col>
            </v-row>
            <v-row v-else no-gutters class="d-flex justify-center align-center py-16">
              <v-col cols="9"> <NoData></NoData> </v-col>
            </v-row>
          </v-card>
        </v-col>
      </v-row>
    </v-tab-item>
  </v-tabs>
</template>

<script lang="ts">
import Vue from "vue";
import { VueConstructor } from "vue/types/umd";
import { NotificationType } from "@/models/Enums/notificationType";
import { getUserNotificationsConfig, putChangeNotifications } from "@/services/notifications";
import User from "@/components/Admin/User.vue";
import NoData from "@/components/NoData.vue";

export default (Vue as VueConstructor<Vue>).extend({
  name: "AdminListUsers",

  components: {
    User,
    NoData
  },

  props: {},

  mixins: [],

  data: () => ({}),

  methods: {}
});
</script>

<style lang="scss" scoped></style>
