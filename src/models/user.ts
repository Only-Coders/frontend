import { CurrentPosition } from "./currentPosition";

export type User = {
  canonicalName: string;
  firstName: string;
  lastName: string;
  imageURI: string;
  amountOfMedals: number;
  currentPosition: CurrentPosition;
};
