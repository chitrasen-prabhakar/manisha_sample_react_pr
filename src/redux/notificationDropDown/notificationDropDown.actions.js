import { NOTIFICATION_DROP_DOWN } from "./notificationDropDown.constants";
import { action } from "src/utils/requestActions";

export function requestNotificationDropDown(payload) {
  return action(NOTIFICATION_DROP_DOWN.REQUEST, payload);
}
