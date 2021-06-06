export type RegisterUser = {
  birthDate: string;
  description: string;
  gitProfile?: {
    platform: string;
    userName: string;
  };
  firstName: string;
  lastName: string;
  imageURI: string;
  country: {
    code: string;
  };
};
