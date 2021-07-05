<template>
  <v-row no-gutters class="d-flex justify-center">
    <v-col cols="6">
      <v-card class="mt-12" min-height="85vh">
        <v-row no-gutters align="center" justify="space-between">
          <v-col cols="11">
            <v-text-field
              hide-no-data
              hide-details
              clearable
              v-model="searchParameters"
              prepend-inner-icon="mdi-magnify"
              :label="$i18n.t('searchBlacklist')"
              solo
              background-color="grey_input"
              flat
              height="48"
              class="pa-4"
              @keydown.enter.prevent="searchUsersWithFilters()"
            ></v-text-field>
          </v-col>
          <v-col cols="1">
            <v-tooltip bottom>
              <template v-slot:activator="{ on, attrs }">
                <v-btn icon @click="showAddDialog = true" v-bind="attrs" v-on="on">
                  <v-icon>mdi-plus</v-icon>
                </v-btn>
              </template>
              <span>{{ $i18n.t("addBlacklistUser") }}</span>
            </v-tooltip>
          </v-col>
        </v-row>

        <v-divider class="mb-6 mx-4 mx-md-8 mt-2"></v-divider>

        <div
          v-if="
            blacklistUsersPagination &&
            blacklistUsersPagination.content &&
            blacklistUsersPagination.content.length !== 0
          "
        >
          <v-col cols="auto" v-for="(user, index) in blacklistUsersPagination.content" :key="user.email">
            <BlacklistUserComponent
              :data="user"
              @deleteFromBlacklist="removeFromBlacklist(index)"
            ></BlacklistUserComponent>
          </v-col>
          <v-pagination
            class="my-10 pb-4"
            v-model="currentPage"
            :length="blacklistUsersPagination.totalPages"
            :total-visible="7"
            @input="nextPageUsers"
          ></v-pagination>
        </div>
        <v-row v-else no-gutters class="d-flex justify-center align-center py-16">
          <v-col cols="9"> <NoData></NoData> </v-col>
        </v-row>
      </v-card>
    </v-col>
    <NewBlacklistUser v-model="showAddDialog" @addBlacklistUser="addUserToCollection" />
  </v-row>
</template>

<script lang="ts">
import Vue from "vue";
import { VueConstructor } from "vue/types/umd";
import NoData from "@/components/NoData.vue";
import BlacklistUserComponent from "@/components/Admin/BlacklistUser.vue";
import { BlacklistUser } from "@/models/blacklistUser";
import { Pagination } from "@/models/Pagination/pagination";
import { getBlacklistUsers, deleteBlacklistUser } from "@/services/blacklist";
import NewBlacklistUser from "@/components/Admin/NewBlackListUser.vue";

export default (Vue as VueConstructor<Vue>).extend({
  name: "AdminListBlacklist",

  components: {
    NoData,
    BlacklistUserComponent,
    NewBlacklistUser
  },

  props: {},

  mixins: [],

  data: () => ({
    currentPage: 1,
    searchParameters: "",
    blacklistUsersPagination: {} as Pagination<BlacklistUser>,
    fetchIsLoading: false,
    timer: 0,
    showAddDialog: false
  }),

  methods: {
    async nextPageUsers() {
      const result = await getBlacklistUsers(this.searchParameters, this.currentPage - 1, 5);
      this.blacklistUsersPagination = result;
      this.currentPage = result.currentPage + 1;
    },
    async removeFromBlacklist(index: number) {
      this.blacklistUsersPagination.content.splice(index, 1);
      let userEmail = this.blacklistUsersPagination.content[index].email;
      await deleteBlacklistUser(userEmail);
    },
    addUserToCollection(userData: BlacklistUser) {
      this.blacklistUsersPagination.content.unshift(userData);
    }
  },

  watch: {
    searchParameters() {
      if (this.searchParameters) {
        this.fetchIsLoading = true;
        if (this.timer != 0) {
          clearTimeout(this.timer);
        }

        this.timer = setTimeout(async () => {
          try {
            const result = await getBlacklistUsers(this.searchParameters, 0, 5);
            this.blacklistUsersPagination = result;
          } catch (error) {
            clearTimeout(this.timer);
          } finally {
            this.fetchIsLoading = false;
          }
        }, 200);
      }
    }
  },

  async created() {
    const result = await getBlacklistUsers("", 0, 5);
    this.currentPage = result.currentPage + 1;
    this.blacklistUsersPagination = result;
  }
});
</script>

<style lang="scss" scoped></style>
