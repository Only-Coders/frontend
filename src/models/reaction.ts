import { ReactionType } from "@/models/Enums/reaction";

export type Reaction = {
  reaction: ReactionType;
  quantity: number;
};
