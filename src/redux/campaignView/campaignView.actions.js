import { CAMPAIGN_VIEW } from "./campaignView.constants";
import { action } from "src/utils/requestActions";

export function requestCampaignView(payload) {
  return action(CAMPAIGN_VIEW.REQUEST, payload);
}

export function resetCampaignView() {
  return action(CAMPAIGN_VIEW.RESET);
}
