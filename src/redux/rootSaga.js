import { all } from "redux-saga/effects";

import { campaignTrailSaga } from "./campaignTrail/campaignTrail.sagas";
import { campaignViewSaga } from "./campaignView/campaignView.sagas";
import { notificationDropDownSaga } from "./notificationDropDown/notificationDropDown.sagas";
import { customKeyViewSaga } from "./customKeyView/customKeyView.sagas";

function* rootSaga() {
  yield all([campaignTrailSaga(), campaignViewSaga(), notificationDropDownSaga(), customKeyViewSaga()]);
}

export default rootSaga;
