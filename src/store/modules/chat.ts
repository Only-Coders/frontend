import { Module, VuexModule, Mutation } from "vuex-module-decorators";

export type Message = {
  text: string;
  time?: number | unknown;
  from: string;
  id?: string;
};

export type ChatType = {
  lastMessage: Message;
  to: string;
  from: string;
  key?: string;
  toCanonicalName?: string;
  toImageURI: string;
  fromImageURI: string;
};

@Module({ name: "chatModule", namespaced: true })
export default class Chat extends VuexModule {
  selectedChat: ChatType | null = null;
  chats: ChatType[] = [];

  @Mutation
  SET_SELECTED_CHAT(value: ChatType) {
    this.selectedChat = value;
  }

  @Mutation
  SET_CHATS(value: ChatType[]) {
    this.chats = value;
  }

  @Mutation
  REMOVE_CHATS() {
    this.chats = [];
  }
}
