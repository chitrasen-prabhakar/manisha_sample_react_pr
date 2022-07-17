import { takeLatest } from "redux-saga/effects";
import { CAMPAIGN_VIEW } from "./campaignView.constants";
import { apiGenerator, getCampaignView } from "src/utils/api";

export function* campaignViewSaga() {
  yield takeLatest(
    CAMPAIGN_VIEW.REQUEST,
    apiGenerator,
    getCampaignView,
    CAMPAIGN_VIEW
  );
}
