<template>
  <v-card class="suggestion__card">
    <v-card-title class="pt-4 pl-6 font-weight-light">{{ $i18n.t("Feed.suggestions") }}</v-card-title>

    <v-divider></v-divider>
    <div v-if="suggestedContacts.length !== 0">
      <v-list v-for="(contact, index) in suggestedContacts" :key="contact.canonicalName">
        <Contact v-bind="{ ...contact }" @remove="removeSuggestedContact(index)"></Contact>
        <v-divider v-if="index < suggestedContacts.length - 1" :key="index"></v-divider>
      </v-list>
    </div>
    <v-row justify="center" v-if="suggestedContacts.length === 0 && !hasFinishedLoading" no-gutters>
      <v-col class="pa-6">
        <v-img
          class="mx-auto mt-6 mb-2"
          src="@/assets/images/undraw_empty_box.svg"
          width="180"
          alt="no data :("
        ></v-img>
        <h4
          v-if="suggestedContacts.length === 0 && !hasFinishedLoading"
          class="text-center pt-4 pb-2 font-weight-light"
        >
          {{ $i18n.t("Feed.noSuggestions") }}
        </h4>
      </v-col>
    </v-row>
  </v-card>
</template>

<script lang="ts">
import Vue from "vue";
import Contact from "@/components/Feed/Contact.vue";
import { getSuggestedContacts } from "@/services/suggestedContact";
import { User } from "@/models/user";

export default Vue.extend({
  name: "Suggestions",

  components: { Contact },

  data: () => ({
    suggestedContacts: [] as User[],
    hasFinishedLoading: false
  }),

  methods: {
    async getSuggestedContacts() {
      this.suggestedContacts = await getSuggestedContacts(10);
    },
    removeSuggestedContact(index: number) {
      this.suggestedContacts.splice(index, 1);
    }
  },
  async created() {
    await this.getSuggestedContacts();
    this.hasFinishedLoading = true;
  }
});
</script>

<style lang="scss" scoped>
.suggestion__card {
  max-height: 68vh !important;
  overflow: auto !important;
}
</style>
