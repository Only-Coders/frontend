<template>
  <div style="position: relative; margin-top: 85px; height: 765px">
    <v-row class="pt-sm-0 pt-16">
      <v-col align="center">
        <h2 class="mb-4">{{ $i18n.t("Onboarding.SuggestedContacts.title") }}</h2>
        <p>
          {{ $i18n.t("Onboarding.SuggestedContacts.text") }}
        </p>
      </v-col>
    </v-row>

    <v-row align="center" justify="center" class="flex-column">
      <v-col sm="9" md="6" lg="5" v-for="(suggestedContact, index) in suggestedContacts" :key="index">
        <Contact v-bind="{ ...suggestedContact }"></Contact>
      </v-col>
    </v-row>

    <img
      :style="$vuetify.breakpoint.xs ? 'display: none' : ''"
      src="@/assets/images/Onboarding/undraw_social_friends.svg"
      alt="social_network"
      class="tags_img hidden-md-and-down"
    />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Contact from "@/components/Contact.vue";
import { get } from "@/services/suggestedContact";
import { SuggestedContact } from "@/models/suggestedContact";

export default Vue.extend({
  name: "SuggestedContactsStep",

  components: { Contact },

  props: { stepAction: Boolean },

  data: () => ({
    suggestedContacts: [] as SuggestedContact[]
  }),

  methods: {},

  watch: {
    async stepAction() {
      this.$emit("moveNextStep");
      this.$destroy();
    }
  },

  async created() {
    const result = await get(10);
    this.suggestedContacts = result;
  }
});
</script>

<style scoped>
.tags_img {
  width: 260px;
  z-index: 2;
  position: absolute;
  bottom: 120px;
  left: 100px;
}
</style>
