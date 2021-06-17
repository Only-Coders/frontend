<template>
  <div>
    <transition-group
      name="list"
      tag="div"
      v-if="contactsPagination"
      class="row align-center justify-center mb-1 mx-16"
    >
      <v-col
        cols="4"
        class="mb-4 mx-0"
        :style="$vuetify.breakpoint.xs ? 'max-height: 350px' : 'max-height: 600px'"
        v-for="(contact, index) in contactsPagination.content"
        :key="contact.canonicalName"
      >
        <PersonalContact
          class="text-center align-center justify-center"
          v-bind="{ ...contact }"
          @deleteFromNetwork="removeContact(index)"
          :isFollow="false"
        ></PersonalContact>
      </v-col>
    </transition-group>

    <v-row
      v-if="contactsPagination && contactsPagination.content.length == 0"
      class="pb-md-8 pb-lg-12 pb-8"
      justify="center"
      no-gutters
    >
      <v-col>
        <NoData></NoData>
      </v-col>
    </v-row>

    <v-pagination
      class="my-10"
      v-if="contactsPagination && contactsPagination.totalPages > 1"
      v-model="currentPage"
      :length="contactsPagination.totalPages"
      :total-visible="7"
      @input="nextPage"
    ></v-pagination>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import PersonalContact from "@/components/Profile/PersonalContact.vue";
import NoData from "@/components/NoData.vue";
import { User } from "@/models/user";
import { Pagination } from "@/models/Pagination/pagination";
import { getContacts, deleteContact } from "@/services/contact";

export default Vue.extend({
  name: "ContactsTab",

  components: { PersonalContact, NoData },

  data: () => ({
    currentPage: 1
  }),

  methods: {
    async removeContact(index: number) {
      await deleteContact(this.contactsPagination.content[index].canonicalName);
      const result = await getContacts(
        this.contactsPagination.content.length > 1 ? this.currentPage - 1 : this.currentPage,

        this.$store.state.userPaginationModule.usersPerPage,
        this.$store.state.userPaginationModule.orderBySelected,
        this.$store.state.userPaginationModule.search,
        this.$store.state.userPaginationModule.country,
        this.$store.state.userPaginationModule.skill
      );
      this.$store.commit("userPaginationModule/SET_USER_PAGINATION", result);
      this.$emit("decrementContact");
    },

    async nextPage() {
      const result = await getContacts(
        this.currentPage - 1,
        this.$store.state.userPaginationModule.usersPerPage,
        this.$store.state.userPaginationModule.orderBySelected,
        this.$store.state.userPaginationModule.search,
        this.$store.state.userPaginationModule.country,
        this.$store.state.userPaginationModule.skill
      );
      this.currentPage = result.currentPage + 1;
      this.$store.commit("userPaginationModule/SET_USER_PAGINATION", result);
    }
  },

  async created() {
    const result = await getContacts(0, 9, this.$store.state.userPaginationModule.orderBySelected);
    this.$store.commit("userPaginationModule/SET_USER_PAGINATION", result);
    this.$store.commit("userPaginationModule/SET_USER_PER_PAGE", 9);
    this.$emit("defineFunction", getContacts);
  },

  computed: {
    contactsPagination: {
      get(): Pagination<User> {
        return this.$store.state.userPaginationModule.userPagination;
      }
    }
  }
});
</script>

<style scoped></style>
