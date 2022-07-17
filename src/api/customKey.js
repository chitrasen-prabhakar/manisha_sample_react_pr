import { HOST, apiRequest, authToken } from "./index";

export const deleteCustomKey = (params) => {
  return apiRequest(
    `${HOST}/v1/campaign-sync/delete/customKey?name=${params.name}`,
    "PUT",
    {},
    authToken,
    ["EDIT_CAMPAIGN_EMAIL_LIST"]
  );
};

export const downloadCustomKeyEmailList = (id) => {
  return `${HOST}/v1/campaign-sync/downloadFile?customKey=${id}`;
};
