import { PostType } from "@/models/Enums/postType";
import { CurrentPosition } from "@/models/currentPosition";
import { GetPostTag } from "@/models/tag";
import { Reaction } from "@/models/reaction";

export type Post = {
  message: string;
  type: PostType;
  isPublic: boolean;
  url: string;
  mentionCanonicalNames: string[];
  tagNames: string[];
};

export type Publisher = {
  canonicalName: string;
  firstName: string;
  lastName: string;
  imageURI: string;
  amountOfMedals: number;
  currentPosition: CurrentPosition;
};

export type GetPost = {
  publisher: Publisher;
  message: string;
  type: string;
  isPublic: boolean;
  url: string;
  mentions: Publisher[];
  tags: GetPostTag[];
  reactions: Reaction[];
  commentQuantity: number;
  myReaction: Reaction;
  createdAt: string;
  isFavorite: boolean;
  id: string;
};
