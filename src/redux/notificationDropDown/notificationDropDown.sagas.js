import { takeLatest } from "redux-saga/effects";
import { NOTIFICATION_DROP_DOWN } from "./notificationDropDown.constants";
import { apiGenerator, getNotificationDropDown } from "src/utils/api";

export function* notificationDropDownSaga() {
  yield takeLatest(
    NOTIFICATION_DROP_DOWN.REQUEST,
    apiGenerator,
    getNotificationDropDown,
    NOTIFICATION_DROP_DOWN
  );
}
