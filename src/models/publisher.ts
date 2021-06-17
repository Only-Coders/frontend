import { CurrentPosition } from "./currentPosition";

export type Publisher = {
  canonicalName: string;
  firstName: string;
  lastName: string;
  fullName: string;
  imageURI: string;
  amountOfMedals: number;
  currentPosition: CurrentPosition;
};
