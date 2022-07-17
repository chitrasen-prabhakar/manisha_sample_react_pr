import { HOST_OPS, apiRequest, authToken } from "../../index";
import { CREATE_CAMPAIGN_INTENT,APPROVE_CAMPAIGN,GET_CAMPAIGN_COMMENTS,PUT_CAMPAIGN_COMMENTS,LIVE_CAMPAIGN,CHECK_CAMPAIGN_STATUS,UPLOAD_CAMPAIGN_COMMENT_FILE } from "./urls"

/**
 * 
 * @param {*} params 
 * @returns 
 */
export const createCampaignIntent = (params) => {
  return apiRequest(
    {
      url: CREATE_CAMPAIGN_INTENT,
      type: "POST",
      params,
      // token:authToken
    }
  );
};

/**
 * 
 * @param {*} params 
 * @returns 
 */

export const approveCampaign = async (params) => {
  let res = await apiRequest({
    url: APPROVE_CAMPAIGN,
    type: "POST",
    params,
    // token:authToken
  });
  return res;
}
/**
 * 
 * @param {*} params 
 * @returns 
 */
export const getComments = async (params) => {
  let res = await apiRequest({
    url: GET_CAMPAIGN_COMMENTS,
    type: "POST",
    params,
    // token:authToken
  });
  return res;
}

/**
 * 
 * @param {*} params 
 * @returns 
 */
export const putComment = async (params) => {
  let res = await apiRequest({
    url: PUT_CAMPAIGN_COMMENTS,
    type: "POST",
    params,
    // token:authToken
  });
  if (params && typeof params.callback === "function") {
    params.callback();
  }
  return res;
}

/**
 * 
 * @param {*} params 
 * @returns 
 */

export const liveCampaign = (params) => {
  return apiRequest(
    {
      url: LIVE_CAMPAIGN,
      type: "POST",
      params,
      // token:authToken
    }
  );
};

/**
 * 
 * @param {*} params 
 * @returns 
 */

export const checkStatus = async (params) => {
  let res = await apiRequest({
    url: CHECK_CAMPAIGN_STATUS,
    type: "POST",
    params
  });
  return res;

}

/**
 * 
 * @param {*} params 
 * @param {*} userId 
 * @returns 
 */
export const uploadCommentFile = async (params, userId) => {
  const headers =
    { 'content-type': 'multipart/form-data' }

  let res = await apiRequest({
    url: UPLOAD_CAMPAIGN_COMMENT_FILE(userId),
    type: "POST",
    params,
    // token:authToken,
    headers
  });
  return res;
}
