<template>
  <v-card class="py-6 chat-list">
    <v-text-field
      class="px-4"
      v-model="partialName"
      label="Search contacts..."
      v-bind="{ ...inputProps }"
    ></v-text-field>
    <v-progress-linear v-if="isLoading" indeterminate color="secondary"></v-progress-linear>
    <v-list two-line v-if="contacts.length === 0">
      <v-subheader>CHATS</v-subheader>
      <v-list-item-group v-model="selectedChat" color="primary">
        <v-list-item
          v-for="(chat, index) in chats"
          :key="chat.toCanonicalName"
          :class="{ 'chat-item__selected': selectedChatComputed ? chat.to == selectedChatComputed.to : false }"
          class="chat-item"
          @click="selectChat(index)"
        >
          <v-list-item-avatar>
            <v-img
              :src="
                user.canonicalName == chat.toCanonicalName
                  ? chat.fromImageURI
                  : chat.toImageURI
                  ? chat.toImageURI
                  : require('@/assets/images/default-avatar.png')
              "
            ></v-img>
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title>{{
              user.canonicalName == chat.toCanonicalName ? chat.from : chat.to
            }}</v-list-item-title>
            <v-list-item-subtitle>{{
              chat.lastMessage.text ? chat.lastMessage.text : "Start a conversation..."
            }}</v-list-item-subtitle>
          </v-list-item-content>
          <v-list-item-action class="pb-6">
            <v-list-item-action-text>{{
              chat.lastMessage.time ? getFormatedDate(chat.lastMessage.time) : ""
            }}</v-list-item-action-text>
          </v-list-item-action>
        </v-list-item>
      </v-list-item-group>
    </v-list>
    <no-chats v-if="chats.length === 0 && contacts.length === 0 && !isLoading"></no-chats>
    <contact-list :contacts="contacts" @add-chat="startConversation"></contact-list>
  </v-card>
</template>

<script lang="ts">
import Vue from "vue";
import ContactList from "@/components/Chat/ContactList.vue";
import NoChats from "@/components/Chat/NoChats.vue";
import { inputMixin } from "@/mixins/inputProps";
import { getContacts } from "@/services/contact";
import { User } from "@/models/user";
import { UsersOptionsOrderBy } from "@/models/Enums/usersOptionsOrderBy";
import { ChatType } from "@/store/modules/chat";
import { UserData } from "@/store/modules/user";
import { database } from "@/plugins/firebaseInit";

export default Vue.extend({
  name: "ChatList",

  mixins: [inputMixin],

  components: {
    ContactList,
    NoChats
  },

  data: () => ({
    partialName: "",
    selectedChat: null as null | number,
    contacts: [] as User[],
    isLoading: false,
    timer: 0
  }),

  created() {
    this.listenToChats();
  },

  methods: {
    startConversation(contact: User) {
      const chatIndex = this.chats.findIndex((chat) => chat.to == contact.fullName);
      if (chatIndex < 0) {
        const chat: ChatType = {
          lastMessage: {
            from: "",
            text: ""
          },
          toImageURI: contact.imageURI,
          fromImageURI: this.user.imageURI,
          to: contact.fullName,
          from: this.user.fullName,
          toCanonicalName: contact.canonicalName
        };
        this.chats.unshift(chat);
        this.$store.commit("chatModule/SET_SELECTED_CHAT", chat);
      } else {
        this.$store.commit("chatModule/SET_SELECTED_CHAT", this.chats[chatIndex]);
        this.selectedChat = chatIndex;
      }
      this.partialName = "";
      this.contacts = [];
    },

    listenToChats() {
      this.isLoading = true;
      let usersRef = database.ref(`users/${this.user.canonicalName}/chats`);
      usersRef.on("value", (userSnapshot) => {
        userSnapshot.forEach((userData) => {
          database.ref("chats/" + userData.val().key).on("value", (chatSnapshot) => {
            const chat = chatSnapshot.val();
            if (chat.key && !this.chatIds[chat.key]) {
              this.$store.commit("chatModule/ADD_CHAT_ID", chat.key);
              this.chats.unshift({
                toImageURI: chat.toImageURI,
                fromImageURI: chat.fromImageURI,
                lastMessage: chat.lastMessage,
                to: chat.to,
                from: chat.from,
                toCanonicalName: chat.toCanonicalName,
                key: chat.key
              });
            }
            const x = this.chats.find((c) => c.key == chat.key);
            if (x) x.lastMessage = chat.lastMessage;
          });
        });
        this.isLoading = false;
      });
    },

    selectChat(index: number) {
      this.$store.commit("chatModule/SET_SELECTED_CHAT", this.chats[index]);
      database
        .ref(`chats/${this.chats[index].key}/messages`)
        .orderByChild("read")
        .equalTo(false)
        .get()
        .then((chatSnapshot) => {
          if (chatSnapshot.val()) {
            const promises = Object.keys(chatSnapshot.val()).map((currentValue) => {
              if (chatSnapshot.val()[currentValue]["from"] != this.user.canonicalName) {
                return database.ref(`chats/${this.chats[index].key}/messages/${currentValue}`).update({ read: true });
              }
            });
            Promise.all(promises).catch();
          }
        });
    },

    getFormatedDate(unixDate: number) {
      const date = new Date(unixDate);

      return (
        (date.getHours() > 10 ? date.getHours() : `0${date.getHours()}`) +
        ":" +
        (date.getMinutes() > 10 ? date.getMinutes() : `0${date.getMinutes()}`)
      );
    }
  },

  computed: {
    user(): UserData {
      return this.$store.state.userModule.user;
    },
    selectedChatComputed(): string {
      return this.$store.state.chatModule.selectedChat;
    },
    chats(): ChatType[] {
      return (this.$store.state.chatModule.chats as ChatType[]).sort((a, b) => {
        return new Date(b.lastMessage.time as number).getTime() - new Date(a.lastMessage.time as number).getTime();
      });
    },
    chatIds(): Record<string, string> {
      return this.$store.state.chatModule.chatIds;
    }
  },

  watch: {
    partialName() {
      if (this.partialName != null) {
        this.isLoading = true;
        if (this.timer != 0) {
          clearTimeout(this.timer);
        }

        this.timer = setTimeout(async () => {
          try {
            if (this.partialName) {
              const pagination = await getContacts(0, 5, UsersOptionsOrderBy.FULLNAME, this.partialName);
              this.contacts = pagination.content;
            } else {
              this.contacts = [];
            }
          } catch (error) {
            clearTimeout(this.timer);
          } finally {
            this.isLoading = false;
          }
        }, 200);
      }
    }
  }
});
</script>

<style scoped>
.chat-list {
  border-top-right-radius: 0px !important;
  border-bottom-right-radius: 0px !important;
}

.chat-item__selected {
  border-left: 4px solid var(--v-secondary-base);
}

.chat-item:not(:last-child) {
  border-bottom: 1px solid #e0e0e0;
}
</style>
