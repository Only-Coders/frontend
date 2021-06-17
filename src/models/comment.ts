import { ReactionType } from "./Enums/reaction";
import { Publisher } from "./publisher";
import { Reaction } from "./reaction";

export type Comment = {
  createdAt: string;
  id: string;
  message: string;
  myReaction: ReactionType;
  publisher: Publisher;
  reactions: Reaction[];
};
