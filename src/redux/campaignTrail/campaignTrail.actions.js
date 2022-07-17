import { CAMPAIGN_TRAIL } from "./campaignTrail.constants";
import { action } from "src/utils/requestActions";

export function requestCampaignTrail(payload) {
  return action(CAMPAIGN_TRAIL.REQUEST, payload);
}
