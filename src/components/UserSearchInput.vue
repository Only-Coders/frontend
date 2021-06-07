<template>
  <div>
    <v-row justify="center" no-gutters>
      <v-col cols="5" class="ml-2 mr-8">
        <v-form>
          <v-text-field
            hide-no-data
            hide-details
            clearable
            v-model="search"
            prepend-inner-icon="mdi-magnify"
            :label="$i18n.t('search')"
            solo
            background-color="grey_input"
            flat
            height="48"
            @keydown.enter.prevent="searchUsersWithFilters()"
          ></v-text-field>
        </v-form>

        <div class="mt-4" v-if="country || skill">
          <v-chip
            class="mr-2 primary--text"
            v-model="country"
            v-if="country != ''"
            close
            label
            color="primary_light"
            @click:close="deleteCountryFilter"
          >
            <p class="font-weight-bold mb-0 mr-1">Country:</p>
            <span> {{ country }} </span></v-chip
          >

          <v-chip
            class="primary--text"
            v-model="skill"
            v-if="skill"
            close
            label
            color="primary_light"
            @click:close="deleteSkillFilter"
          >
            <p class="font-weight-bold mb-0 mr-1">Skill:</p>
            <span> {{ skill }} </span></v-chip
          >
        </div>
      </v-col>

      <v-col cols="2">
        <v-btn color="grey" block outlined height="48" @click.stop="createDialog = true">
          {{ $i18n.t("filters") }}</v-btn
        >
      </v-col>

      <v-col cols="2">
        <v-select
          v-model="orderBySelected"
          :items="orderByOptions"
          item-value="value"
          item-text="text"
          @change="changeOrderBy"
          hide-details
          hide-no-data
          flat
          solo
          height="48"
          background-color="grey_input"
          :label="$i18n.t('orderBy')"
          width="35%"
          class="mx-2"
        ></v-select>
      </v-col>
    </v-row>

    <UserSearchFiltersDialog
      v-if="createDialog"
      v-model="createDialog"
      @applyFilters="applyFilters"
      :country="country"
      :skill="skill"
    ></UserSearchFiltersDialog>
  </div>
</template>

<script lang="ts">
import Vue, { PropType } from "vue";
import { User } from "@/models/user";
import { Pagination } from "@/models/Pagination/pagination";
import UserSearchFiltersDialog from "@/components/UserSearchFiltersDialog.vue";
import { UsersOptionsOrderBy } from "@/models/Enums/usersOptionsOrderBy";
import { i18n } from "@/main";

type OrderBy = {
  value: UsersOptionsOrderBy;
  text: string;
};

type SearchUserFunction =
  | null
  | ((
      page: number,
      size: number,
      orderBy: string,
      partialName?: string,
      countryName?: string,
      skillName?: string
    ) => Promise<Pagination<User>>);

export default Vue.extend({
  name: "UserSearchInput",

  components: { UserSearchFiltersDialog },

  props: {
    searchPersonalContacts: Boolean,
    searchPersonalFollows: Boolean,
    doReloadPage: Boolean,
    searchFunction: Function as PropType<SearchUserFunction>,
    cleanSearchInputs: Boolean
  },

  data: () => ({
    page: 1,
    userPagination: [] as Pagination<User>[],
    createDialog: false,
    country: "",
    skill: "",
    orderByOptions: [
      { value: UsersOptionsOrderBy.FULLNAME, text: i18n.t("fullname").toString() },
      { value: UsersOptionsOrderBy.MEDALS, text: i18n.t("medals").toString() }
    ] as OrderBy[],
    orderBySelected: UsersOptionsOrderBy.FULLNAME as UsersOptionsOrderBy
  }),

  methods: {
    async applyFilters() {
      this.country = this.$store.state.userPaginationModule.country ?? "";

      this.skill = this.$store.state.userPaginationModule.skill ?? "";

      await this.searchUsersWithFilters();
    },
    async deleteCountryFilter() {
      this.country = "";
      this.$store.commit("userPaginationModule/SET_COUNTRY", this.country);
      await this.searchUsersWithFilters();
    },
    async deleteSkillFilter() {
      this.skill = "";
      this.$store.commit("userPaginationModule/SET_SKILL", this.skill);
      await this.searchUsersWithFilters();
    },
    async searchUsersWithFilters() {
      if (this.searchFunction) {
        const result = await this.searchFunction(
          0,
          this.$store.state.userPaginationModule.usersPerPage,
          this.$store.state.userPaginationModule.orderBySelected,
          this.$store.state.userPaginationModule.search,
          this.$store.state.userPaginationModule.country,
          this.$store.state.userPaginationModule.skill
        );

        this.$store.commit("userPaginationModule/SET_USER_PAGINATION", result);
      }
    },
    async changeOrderBy() {
      this.$store.commit("userPaginationModule/SET_ORDER_BY", this.orderBySelected);
      await this.searchUsersWithFilters();
    }
  },

  computed: {
    search: {
      get(): string {
        return this.$store.state.userPaginationModule.search;
      },
      async set(value: string) {
        this.$store.commit("userPaginationModule/SET_SEARCH_TEXT", value);
        if (!value) {
          await this.searchUsersWithFilters();
        }
      }
    }
  },

  watch: {
    cleanSearchInputs() {
      this.country = "";
      this.skill = "";
      this.orderBySelected = UsersOptionsOrderBy.FULLNAME;
    }
  }
});
</script>

<style scoped></style>
