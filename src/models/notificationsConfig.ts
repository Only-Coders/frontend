import { NotificationType } from "@/models/Enums/notificationType";

export type NotificationsConfig = {
  id: string;
  type: NotificationType;
  email: boolean;
  push: boolean;
};
