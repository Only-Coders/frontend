<template>
  <v-row no-gutters class="my-12" justify="center">
    <v-col
      v-for="card in cards"
      :key="card.quantity"
      cols="10"
      sm="5"
      md="3"
      class="my-2 mx-sm-2 mx-md-5 mx-lg-10 mx-xl-16"
    >
      <dash-card
        :color="card.color"
        :icon="card.icon"
        :message="card.message"
        :quantity="usersQuantity[card.quantity]"
        :isLoading="isLoading"
      ></dash-card>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import Vue, { PropType } from "vue";
import DashCard from "@/components/Admin/DashCard.vue";
import { UsersQuantity } from "@/models/usersQuantity";
import { i18n } from "@/main";

type Quantity = "totalActiveUsers" | "totalBlockedUsers" | "totalBannedUsers";

export default Vue.extend({
  name: "DashCardList",

  components: {
    DashCard
  },

  props: {
    usersQuantity: {
      type: Object as PropType<UsersQuantity>,
      required: true
    },
    isLoading: {
      type: Boolean,
      required: true
    }
  },

  data: () => ({
    cards: [
      {
        color: "#2E7D32",
        icon: "mdi-earth",
        message: i18n.t("Admin.totalActiveUsers"),
        quantity: "totalActiveUsers" as Quantity
      },
      {
        color: "#3F51B5",
        icon: "mdi-account-cancel",
        message: i18n.t("Admin.totalBlockedUsers"),
        quantity: "totalBlockedUsers" as Quantity
      },
      {
        color: "var(--v-secondary-base)",
        icon: "mdi-ghost-off-outline",
        message: i18n.t("Admin.totalBannedUsers"),
        quantity: "totalBannedUsers" as Quantity
      }
    ]
  })
});
</script>

<style scoped></style>
