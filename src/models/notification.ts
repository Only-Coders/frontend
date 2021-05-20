import { VueConstructor } from "vue/types/umd";
import notificationsMixin from "@/mixins/notifications";

type NotificationMixing = VueConstructor<Vue & InstanceType<typeof notificationsMixin>>;
