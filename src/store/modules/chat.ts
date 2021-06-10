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
  chatIds: Record<string, string> = {};

  @Mutation
  SET_SELECTED_CHAT(value: ChatType): void {
    this.selectedChat = value;
  }

  @Mutation
  SET_CHATS(value: ChatType[]): void {
    this.chats = value;
  }

  @Mutation
  ADD_CHAT_ID(value: string): void {
    this.chatIds[value] = value;
  }

  @Mutation
  REMOVE_CHATS(): void {
    this.chats = [];
  }
}
