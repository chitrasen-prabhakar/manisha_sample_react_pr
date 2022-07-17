import { takeLatest } from "redux-saga/effects";
import { CAMPAIGN_TRAIL } from "./campaignTrail.constants";
import { apiGenerator, getCampaignTrails } from "src/utils/api";

export function* campaignTrailSaga() {
  yield takeLatest(
    CAMPAIGN_TRAIL.REQUEST,
    apiGenerator,
    getCampaignTrails,
    CAMPAIGN_TRAIL
  );
}
