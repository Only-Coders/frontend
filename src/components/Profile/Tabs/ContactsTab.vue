<template>
  <div>
    <v-row align="center" justify="center" no-gutters class="mb-7">
      <v-col cols="5" class="ml-2 mr-8">
        <v-form>
          <v-text-field
            hide-no-data
            hide-details
            clearable
            prepend-inner-icon="mdi-magnify"
            :label="$i18n.t('search')"
            solo
            background-color="grey_input"
            flat
            height="48"
          ></v-text-field>
        </v-form>
      </v-col>

      <v-col cols="2">
        <v-btn color="grey" block outlined height="48"> {{ $i18n.t("filters") }}</v-btn>
      </v-col>

      <v-col cols="2">
        <v-select
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

    <v-divider class="mx-16 mb-6"></v-divider>

    <transition-group name="list" tag="div" class="row align-center justify-center mb-1 mx-16">
      <v-col
        cols="4"
        class="mb-4 mx-0"
        :style="$vuetify.breakpoint.xs ? 'max-height: 350px' : 'max-height: 600px'"
        v-for="(contact, index) in personalContacts"
        :key="contact.canonicalName"
      >
        <PersonalContact
          class="text-center align-center justify-center"
          v-bind="{ ...contact }"
          @confirmContactDeletion="removeContact(index)"
          @confirmUserUnfollow="unfollowUser(index)"
        ></PersonalContact>
      </v-col>
    </transition-group>

    <v-row v-if="personalContacts.length == 0" class="pb-md-8 pb-lg-12 pb-8" justify="center" no-gutters>
      <v-col>
        <NoData></NoData>
      </v-col>
    </v-row>

    <v-pagination class="my-10" v-model="page" :length="totalPages" :total-visible="7" @input="nextPage"></v-pagination>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import PersonalContact from "@/components/Profile/PersonalContact.vue";
import NoData from "@/components/NoData.vue";
import { getContacts } from "@/services/contact";
import { User } from "@/models/user";
import { deleteContact } from "@/services/contact";

export default Vue.extend({
  name: "ContactsTab",

  components: { PersonalContact, NoData },

  data: () => ({
    personalContacts: [] as User[],
    page: 1,
    totalPages: 0
  }),

  methods: {
    async removeContact(index: number) {
      await deleteContact(this.personalContacts[index].canonicalName);
      this.personalContacts.splice(index, 1);
    },
    unfollowUser(index: number) {
      //TODO: unfollow
    },
    async nextPage() {
      const result = await getContacts(this.page - 1, 1);
      this.personalContacts = result.content;
    }
  },

  async created() {
    const result = await getContacts(0, 1);
    this.personalContacts = result.content;
    this.totalPages = result.totalPages;
  }
});
</script>

<style scoped></style>
