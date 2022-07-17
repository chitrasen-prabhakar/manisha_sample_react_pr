import { takeLatest } from "redux-saga/effects";
import { CUSTOM_KEY_VIEW } from "./customKeyView.constants";
import { apiGenerator, getCustomKeyView } from "src/utils/api";

export function* customKeyViewSaga() {
  yield takeLatest(
    CUSTOM_KEY_VIEW.REQUEST,
    apiGenerator,
    getCustomKeyView,
    CUSTOM_KEY_VIEW
  );
}
