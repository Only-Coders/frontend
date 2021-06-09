<template>
  <v-card-actions class="new-message">
    <v-row no-gutters>
      <v-col cols="10" v-if="selectedChat">
        <v-textarea
          v-model="message"
          v-bind="{ ...inputProps }"
          label="Type a message..."
          rows="1"
          no-resize
          hide-details
          @keydown.enter.prevent="sendMessage"
        ></v-textarea>
        <v-emoji-picker class="emojis__content" @select="selectEmoji" v-if="showEmojis" />
      </v-col>
      <v-col class="d-flex align-center justify-center new-message__actions" v-if="selectedChat">
        <v-btn icon x-large @click="showEmojis = !showEmojis">
          <v-icon>mdi-emoticon-outline</v-icon>
        </v-btn>
        <v-btn icon x-large @click="sendMessage">
          <v-icon>mdi-send</v-icon>
        </v-btn>
      </v-col>
    </v-row>
  </v-card-actions>
</template>

<script lang="ts">
import Vue from "vue";
import { inputMixin } from "@/mixins/inputProps";
import { ChatType } from "@/store/modules/chat";
import { database, getServerDate } from "@/plugins/firebaseInit";
import { VEmojiPicker } from "v-emoji-picker";

export default Vue.extend({
  name: "NewMessage",

  mixins: [inputMixin],

  components: {
    VEmojiPicker
  },

  props: {
    hasMessages: Boolean
  },

  data: () => ({
    message: "",
    showEmojis: false
  }),

  methods: {
    selectEmoji(emoji: { data: string }) {
      if (this.message) {
        this.message += emoji.data;
      } else {
        this.message = emoji.data;
      }
      this.showEmojis = !this.showEmojis;
    },

    createChat() {
      if (this.selectedChat) {
        const newChat = { ...this.selectedChat };
        const newMessage = {
          text: this.message,
          time: getServerDate(),
          from: this.canonicalName
        };
        newChat.lastMessage = newMessage;
        const chatRef = database.ref("chats").push(newChat);
        database.ref(`chats/${chatRef.key}/messages`).push(newMessage);
        database.ref(`users/${this.selectedChat.toCanonicalName}/chats`).push({ key: chatRef.key });
        database.ref(`users/${this.canonicalName}/chats`).push({ key: chatRef.key });
        newChat.key = chatRef.key ?? "";
        this.$store.commit("chatModule/SET_SELECTED_CHAT", newChat);
        this.message = "";
      }
    },

    async sendMessage() {
      if (this.message) {
        if (this.hasMessages) {
          const newMessage = {
            text: this.message,
            time: getServerDate(),
            from: this.canonicalName
          };
          if (this.selectedChat) {
            const newChat = { ...this.selectedChat };
            newChat.lastMessage = newMessage;
            database.ref(`chats/${this.selectedChat.key}/messages`).push(newMessage);
            await database.ref(`chats/${this.selectedChat.key}`).update(newChat);
            await database
              .ref(`chats/${this.selectedChat.key}`)
              .child("lastMessage")
              .once("value", (snapshot) => {
                newChat.lastMessage.time = snapshot.val().time;
              });

            const chats: ChatType[] = [...this.$store.state.chatModule.chats];
            const chatIndex = chats.findIndex((c) => c.key == newChat.key);
            chats.splice(chatIndex, 1);
            chats.unshift(newChat);
            this.$store.commit("chatModule/SET_CHATS", chats);
            this.message = "";
          }
        } else {
          this.createChat();
        }
      }
    }
  },

  computed: {
    selectedChat(): ChatType | null {
      return this.$store.state.chatModule.selectedChat;
    },
    canonicalName(): string {
      return this.$store.state.userModule.user.canonicalName;
    }
  }
});
</script>

<style scoped>
.new-message {
  height: 80px;
}

.new-message__actions {
  background: var(--v-grey_input-base) !important;
}

.emojis__content {
  height: 200px;
  width: 250px !important;
  position: fixed;
  bottom: 150px;
  right: 150px;
  z-index: 2;
}
</style>
