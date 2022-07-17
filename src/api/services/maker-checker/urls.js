import { AUDIT } from "../../index";

/**
 * maker checker api's
 */

export const CREATE_CAMPAIGN_INTENT = `${AUDIT}/mc/intent/campaign`
export const APPROVE_CAMPAIGN = `${AUDIT}/mc/intent/campaign/approve`
export const GET_CAMPAIGN_COMMENTS =  `${AUDIT}/mc/intent/campaign/message/all`
export const PUT_CAMPAIGN_COMMENTS = `${AUDIT}/mc/intent/campaign/message`
export const LIVE_CAMPAIGN = `${AUDIT}/mc/intent/campaign/live`
export const CHECK_CAMPAIGN_STATUS = `${AUDIT}/mc/checkStatus`
export const UPLOAD_CAMPAIGN_COMMENT_FILE = (userId) => `${AUDIT}/mc/uploadFile?userId=${userId}`
