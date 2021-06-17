import axios from "@/plugins/axios";
import { NotificationsConfig } from "@/models/notificationsConfig";

export async function putChangeNotifications(notificationConfig: NotificationsConfig): Promise<void> {
  await axios.put(`/api/notifications-config/${notificationConfig.id}`, notificationConfig);
}

export async function getUserNotificationsConfig(): Promise<NotificationsConfig[]> {
  const response = await axios.get(`/api/notifications-config`);
  return response.data;
}
