<template>
  <v-card class="chat-messages">
    <chat-header></chat-header>
    <v-card-text class="chat-messages__content">
      <no-messages v-if="messages.length === 0"></no-messages>
      <infinite-loading v-if="enableInfiniteLoading" spinner="waveDots" @infinite="infiniteHandler" direction="top">
        <div slot="no-more" class="pt-4"></div>
        <div slot="no-results" class="pt-4"></div>
      </infinite-loading>
      <message
        v-for="message in messages"
        :message="message"
        :date="getFormatedDate(message.time)"
        :isMine="isMine(message.from)"
        :key="message.id"
      ></message>
    </v-card-text>
    <new-message :hasMessages="messages.length !== 0"></new-message>
  </v-card>
</template>

<script lang="ts">
import Vue from "vue";
import NewMessage from "@/components/Chat/ChatMessages/NewMessage.vue";
import ChatHeader from "@/components/Chat/ChatMessages/ChatHeader.vue";
import Message from "@/components/Chat/ChatMessages/Message.vue";
import NoMessages from "@/components/Chat/NoMessages.vue";
import InfiniteLoading from "vue-infinite-loading";
import { Message as MessageType, ChatType } from "@/store/modules/chat";
import { database } from "@/plugins/firebaseInit";

type InfiniteLoaderState = {
  loaded: () => void;
  complete: () => void;
};

export default Vue.extend({
  name: "ChatMessages",

  components: {
    NewMessage,
    ChatHeader,
    InfiniteLoading,
    Message,
    NoMessages
  },

  data: () => ({
    messages: [] as MessageType[],
    enableInfiniteLoading: false
  }),

  created() {
    this.listenToMessages();
  },

  methods: {
    listenToMessages() {
      if (this.selectedChat && this.selectedChat.key) {
        const itemsRef = database.ref(`chats/${this.selectedChat.key}/messages`);
        itemsRef.limitToLast(25).on("value", (snapshot) => {
          const data = snapshot.val();
          Object.keys(data).forEach((key) => {
            if (!this.messages.find((m) => m.id === key)) {
              this.messages.push({
                id: key,
                from: data[key].from,
                text: data[key].text,
                time: data[key].time
              });
            }
          });
          this.enableInfiniteLoading = true;
        });
        Vue.nextTick(() => {
          let container = this.$el.querySelector(".chat-messages__content");
          if (container) container.scrollTop = container.scrollHeight;
        });
      }
    },

    async infiniteHandler($state: InfiniteLoaderState) {
      setTimeout(async () => {
        const newMessages = await this.getMoreMessages();
        if (newMessages.length > 0) {
          this.messages = [...newMessages, ...this.messages];
          $state.loaded();
        } else {
          $state.complete();
        }
      }, 300);
    },

    async getMoreMessages(): Promise<MessageType[]> {
      let messages: MessageType[] = [];
      const localMessages: MessageType[] = this.messages;
      const itemsRef = database.ref(`chats/${this.selectedChat.key}/messages`);
      const result = await itemsRef
        .orderByKey()
        .endAt(this.messages[0].id ?? "")
        .limitToLast(26)
        .once("value");
      result.forEach(function (childSnapshot) {
        let message: MessageType = childSnapshot.val();
        message.id = childSnapshot.key ?? "";
        if (!localMessages.find((m) => m.id === message.id)) {
          messages.push(message);
        }
      });
      return messages;
    },

    isMine(from: string): boolean {
      return this.$store.state.userModule.user.canonicalName == from;
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
    selectedChat(): ChatType {
      return this.$store.state.chatModule.selectedChat;
    }
  },

  watch: {
    selectedChat() {
      this.messages = [];
      this.listenToMessages();
    },
    messages(newValue: MessageType[]) {
      if (
        newValue.length > 1 &&
        newValue[newValue.length - 1].from == this.$store.state.userModule.user.canonicalName
      ) {
        Vue.nextTick(() => {
          let container = this.$el.querySelector(".chat-messages__content");
          if (container) container.scrollTop = container.scrollHeight;
        });
      }
    }
  }
});
</script>

<style scoped lang="scss">
.chat-messages {
  border-top-left-radius: 0px !important;
  border-bottom-left-radius: 0px !important;

  .chat-messages__content {
    height: 60vh;
    overflow-y: auto;
    border-top: 1px solid #e0e0e0;
    background: #fafafa;
  }
}
</style>
