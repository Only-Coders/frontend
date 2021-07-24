<template>
  <div class="suggested-contacts">
    <v-row>
      <v-col align="center">
        <h2 class="mb-4">{{ $i18n.t("Onboarding.SuggestedContacts.title") }}</h2>
        <p class="mx-10 mx-sm-0">
          {{ $i18n.t("Onboarding.SuggestedContacts.text") }}
        </p>
      </v-col>
    </v-row>

    <div
      :style="isLaptop() ? 'max-height: 55vh' : 'max-height: 70vh'"
      class="overflow-y-auto overflow-x-hidden d-flex flex-column"
      no-gutters
    >
      <transition-group name="list" tag="div" class="row flex-column align-center justify-center">
        <v-col
          cols="10"
          md="8"
          lg="5"
          v-for="(suggestedContact, index) in suggestedContacts"
          :key="suggestedContact.canonicalName"
        >
          <Contact v-bind="{ ...suggestedContact }" @remove="removeSuggestedContact(index)"></Contact>
        </v-col>
      </transition-group>
    </div>

    <transition
      name="aaa"
      v-if="suggestedContacts.length == 0"
      class="pb-md-8 pb-lg-12 pb-8"
      justify="center"
      no-gutters
    >
      <v-col>
        <no-data></no-data>
      </v-col>
    </transition>

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
import { getSuggestedContacts } from "@/services/suggestedContact";
import { User } from "@/models/user";
import NoData from "@/components/NoData.vue";

export default Vue.extend({
  name: "SuggestedContactsStep",

  components: { Contact, NoData },

  data: () => ({
    suggestedContacts: [] as User[]
  }),

  methods: {
    removeSuggestedContact(index: number) {
      this.suggestedContacts.splice(index, 1);
    },
    isLaptop() {
      return window.innerHeight <= 800;
    }
  },

  async created() {
    const result = await getSuggestedContacts(20);
    this.suggestedContacts = result;
  }
});
</script>

<style scoped>
.suggested-contacts {
  position: relative;
  margin-top: 75px;
  height: 765px;
}

.tags_img {
  width: 260px;
  z-index: 2;
  position: absolute;
  bottom: 100px;
  left: 100px;
}

.list-enter-active,
.list-leave-active {
  transition: all 0.4s;
}
.list-enter,
.list-leave-to {
  transform: scale(0);
}
</style>
