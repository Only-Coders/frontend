<template>
  <v-sheet v-if="loading" color="grey lighten-4" class="pa-3">
    <v-skeleton-loader class="mx-auto" type="card"></v-skeleton-loader>
  </v-sheet>

  <v-card v-else class="contact-requests">
    <v-card-title>
      <h4>{{ $i18n.t("ViewProfile.contactRequests") }}</h4>
    </v-card-title>

    <v-card-text class="pb-0">
      <transition-group name="list" tag="div" class="row flex-column align-center justify-center">
        <v-col cols="12" v-for="(contactRequest, index) in receivedContactRequests" :key="contactRequest.id">
          <ContactRequest
            @remove="removeContactRequest(index)"
            v-bind="{ ...contactRequest.requester }"
          ></ContactRequest>
        </v-col>
      </transition-group>
    </v-card-text>

    <v-card-actions v-if="totalPages > 1" class="mt-2 pt-0 pa-0"
      ><v-btn text color="secondary" block class="text-caption" @click="nextContactRequests"
        >{{ $i18n.t("seeMore") }}
      </v-btn></v-card-actions
    >
  </v-card>
</template>

<script lang="ts">
import Vue from "vue";
import { getContactRequests } from "@/services/receivedContactRequests";
import { ContactRequester } from "@/models/contactRequester";
import ContactRequest from "@/components/Profile/ContactRequest.vue";

export default Vue.extend({
  name: "ReceivedContactRequests",

  components: { ContactRequest },

  data: () => ({
    receivedContactRequests: [] as ContactRequester[],
    currentPage: 0,
    totalPages: 0,
    loading: true
  }),

  methods: {
    async nextContactRequests() {
      this.currentPage == this.totalPages - 1 ? (this.currentPage = 0) : this.currentPage++;
      const result = await getContactRequests(this.currentPage, 1);
      this.receivedContactRequests = result.content;
    },
    removeContactRequest(index: number) {
      this.receivedContactRequests.splice(index, 1);
      this.$emit("pepe");
    }
  },

  async created() {
    const result = await getContactRequests(0, 5);
    this.loading = false;
    this.receivedContactRequests = result.content;
    this.totalPages = result.totalPages;
  },

  watch: {
    receivedContactRequests() {
      if (this.receivedContactRequests.length == 0) {
        this.$emit("hideContactsRequests");
      }
    }
  }
});
</script>

<style scoped>
.contact-requests {
  border-top: 3px solid var(--v-primary-base) !important;
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
