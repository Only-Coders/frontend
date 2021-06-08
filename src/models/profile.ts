import { CurrentPosition } from "@/models/currentPosition";
import { Country } from "./country";

export type Profile = {
  firstName: string;
  lastName: string;
  description: string;
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
  pendingRequest: boolean;
  requestHasBeenSent: boolean;
  country: Country;
  birthDate: string;
  following: boolean;
  connected: boolean;
};
