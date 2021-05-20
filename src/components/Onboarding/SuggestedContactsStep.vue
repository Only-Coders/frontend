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

    <transition-group name="list" tag="div" class="row flex-column align-center justify-center">
      <v-col
        cols="10"
        md="8"
        lg="5"
        v-for="(suggestedContact, index) in suggestedContacts.slice(0, 4)"
        :key="suggestedContact.canonicalName"
      >
        <Contact v-bind="{ ...suggestedContact }" @remove="removeSuggestedContact(index)"></Contact>
      </v-col>
    </transition-group>

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

  methods: {
    removeSuggestedContact(index: number) {
      console.log(index);
      this.suggestedContacts.splice(index, 1);
    }
  },

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

.list-enter-active,
.list-leave-active {
  transition: all 0.4s;
}
.list-enter, .list-leave-to /* .list-leave-active below version 2.1.8 */ {
  transform: scale(0);
}
</style>
