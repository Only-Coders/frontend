export type Admin = {
  firstName: string;
  lastName: string;
  email: string;
  imageURI: string;
};

export type GetAdminUser = {
  canonicalName: string;
  firstName: string;
  lastName: string;
  imageURI: string;
  blocked: boolean;
  role: {
    name: string;
  };
};
