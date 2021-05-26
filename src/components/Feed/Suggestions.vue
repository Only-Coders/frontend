<template>
  <v-row justify="center">
    <v-card width="250">
      <v-row justify="space-between" align="center">
        <v-card-title class="pt-4 pl-6 font-weight-light">{{ $i18n.t("Feed.suggestions") }}</v-card-title>
      </v-row>
      <v-divider></v-divider>
      <div v-if="suggestedContacts.length !== 0">
        <v-list v-for="(contact, index) in suggestedContacts" :key="contact.canonicalName">
          <Contact v-bind="{ ...contact }" @remove="removeSuggestedContact(index)"></Contact>
          <v-divider v-if="index < suggestedContacts.length - 1" :key="index"></v-divider>
        </v-list>
      </div>
      <v-row justify="center" v-if="suggestedContacts.length === 0">
        <v-col>
          <v-img
            class="mx-auto mt-6 mb-2"
            src="@/assets/images/undraw_empty_box.svg"
            width="180"
            alt="no data :("
          ></v-img>
          <h4 class="text-center pt-4 pb-2 font-weight-light text-truncate">{{ $i18n.t("Feed.noSuggestions") }}</h4>
        </v-col>
      </v-row>
      <v-row v-if="suggestedContacts.length !== 0" justify="center" class="pb-2">
        <v-btn text color="primary" class="v-btn__content">{{ $i18n.t("Feed.seeMore") }} </v-btn>
      </v-row>
    </v-card>
  </v-row>
</template>

<script lang="ts">
import Vue from "vue";
import Contact from "@/components/Feed/Contact.vue";
import { get } from "@/services/suggestedContact";
import { SuggestedContact } from "@/models/suggestedContact";

export default Vue.extend({
  name: "Suggestions",

  components: { Contact },

  data: () => ({
    suggestedContacts: [] as SuggestedContact[]
  }),

  methods: {
    async getSuggestedContacts() {
      this.suggestedContacts = await get(10);
    },
    removeSuggestedContact(index: number) {
      this.suggestedContacts.splice(index, 1);
    }
  },
  async created() {
    await this.getSuggestedContacts();
  }
});
</script>

<style lang="scss" scoped>
.v-btn__content {
  text-transform: lowercase !important;
  font-weight: bold !important;
  font-size: 14px !important;
}
</style>
