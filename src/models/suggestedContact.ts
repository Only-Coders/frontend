import { CurrentPosition } from "./currentPosition";

export type SuggestedContact = {
  canonicalName: string;
  firstName: string;
  lastName: string;
  imageURI: string;
  currentPosition: CurrentPosition;
};
