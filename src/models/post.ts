import { PostType } from "@/models/Enums/postType";

export type Post = {
  message: string;
  type: PostType;
  isPublic: boolean;
  url: string;
  mentionCanonicalNames: string[];
  tagNames: string[];
};
