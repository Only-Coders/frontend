<template>
  <v-row justify="center">
    <v-card max-width="220">
      <v-row justify="space-between" align="center">
        <v-card-title class="pt-4 pl-6 font-weight-light">Suggestions</v-card-title>
        <v-btn icon color="black"><v-icon>mdi-dots-vertical</v-icon></v-btn>
      </v-row>
      <v-divider></v-divider>
      <v-row justify="center" class="pt-4">
        <div class="pt-2" v-for="(contact, index) in suggestedContacts" :key="contact">
          <Contact v-bind="{ ...contact }" @remove="removeSuggestedContact(index)"></Contact>
        </div>
      </v-row>
      <v-row justify="center" class="pb-2">
        <v-btn text color="primary" class="v-btn__content"> ver mas </v-btn>
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
