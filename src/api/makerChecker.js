import { HOST_OPS, apiRequest, authToken } from "./index";

export const createCampaignIntent = (params) => {
  return apiRequest(
    `/auditservice/mc/intent/campaign`,
    "POST",
    params,
    authToken
  );
};

export const approveCampaign = async (params) => {
  let res = await apiRequest(`/auditservice/mc/intent/campaign/approve`, "POST", params, authToken);
  return res;
}

export const getComments = async (params) => {
  let res = await apiRequest(`/auditservice/mc/intent/campaign/message/all`, "POST", params, authToken);
  return res;
}

export const putComment = async (params) => {
  let res = await apiRequest(`/auditservice/mc/intent/campaign/message`, "POST", params, authToken);
  if (params && typeof params.callback === "function") {
    params.callback();
  }
  return res;
}

export const liveCampaign = (params) => {
  return apiRequest(
    `/auditservice/mc/intent/campaign/live`,
    "POST",
    params,
    authToken
  );
};


export const checkStatus = async (params) => {
  let res = await apiRequest(`/auditservice/mc/checkStatus`, "POST", params);
    return res;

}

export const uploadCommentFile = async (params, userId) => {
  const headers =
    { 'content-type': 'multipart/form-data' }

  let res = await apiRequest(`/auditservice/mc/uploadFile?userId=${userId}`, "POST", params, authToken, [], headers);
  return res;
}
