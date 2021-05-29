import { User } from "./user";

export type ContactRequester = {
  id: string;
  requester: User;
  message: string;
};
