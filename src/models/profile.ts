import { CurrentPosition } from "@/models/currentPosition";

export type Profile = {
  firstName: string;
  lastName: string;
  email: string;
  imageURI: string;
  canonicalName: string;
  defaultPrivacyIsPublic: boolean;
  gitProfile: {
    platform: "";
    userName: string;
  };
  medalQty: number;
  followerQty: number;
  contactQty: number;
  postQty: number;
  currentPosition: CurrentPosition;
  connected: boolean;
  following: boolean;
  pendingRequest: boolean;
};
