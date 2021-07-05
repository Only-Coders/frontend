<template>
  <v-card class="py-2" flat v-if="contacts.length > 0">
    <v-list two-line>
      <v-subheader>CONTACTS</v-subheader>
      <v-list-item
        v-for="contact in contacts"
        :key="contact.id"
        class="contact-item"
        @click="startConversation(contact)"
      >
        <v-list-item-avatar>
          <v-img :src="contact.imageURI ? contact.imageURI : require('@/assets/images/default-avatar.png')"></v-img>
        </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title>{{ contact.fullName }}</v-list-item-title>
          <v-list-item-subtitle>{{ $i18n.t("Chat.startConversation") }}</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-card>
</template>

<script lang="ts">
import Vue, { PropType } from "vue";
import { User } from "@/models/user";

export default Vue.extend({
  name: "ContactList",

  props: {
    contacts: Array as PropType<User[]>
  },

  methods: {
    startConversation(contact: User) {
      this.$emit("add-chat", contact);
    }
  }
});
</script>

<style scoped>
.contact-item:not(:last-child) {
  border-bottom: 1px solid #e0e0e0;
}
</style>
