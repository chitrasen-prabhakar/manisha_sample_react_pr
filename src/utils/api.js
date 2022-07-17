//lib imports
import { put, call } from "redux-saga/effects";
const axios = require("axios");

export const authToken =
  typeof window !== "undefined" &&
  window.localStorage &&
  window.localStorage.getItem("isUserLogin");

// Prepend localhost in following string for local development
// Otherwise, relative path is working fine for staging env
// No need of process.env.NEXT_PUBLIC_HOST
// const HOST = "http://10.220.21.229:8080";
// const HOST_AUDIT = "http://10.252.5.76:8080";
// const HOST_SMS_PANAL = "http://10.252.5.76:8082"; //'http://opspanel-staging.fcinternal.in';

const HOST = "/api";
const HOST_AUDIT = "/api";
const HOST_SMS_PANAL = "https://payments-ops-platform.freecharge.in";

const CAMPAIGN = "/campaign";
const NOTIFICATION = "/notification";
const OLDPANEL = "/oldpanel";
const AUDIT = "/auditservice";
const AMC = "/amcService";
const CONSUMER = "/consumercredit";
const KP = "/kp";

//resuable function to create sagas
export function* apiGenerator(...data) {
  const func = data[0];
  const actions = data[1];
  const { params } = data[2];
  try {
    const payload = yield call(func, params);
    yield put({ type: actions.SUCCESS, payload, params });
  } catch (error) {
    yield put({ type: actions.FAILURE, error, params });
  }
}

//improve function logic in case of multiple permissions. Ideally sending permission from client is not required and a security vunerability and this whole concept must be removed in future.
function createPermissions(permissionArr) {
  let permissionStr = "(";
  permissionArr.forEach((permission) => {
    permissionStr = permissionStr + "hasPermission('" + permission + "')";
  });
  return permissionStr + ")";
}

async function apiRequest(
  url = "",
  type,
  additionalData = {},
  token,
  permissions = [],
  headers
) {
  try {
    const headersData = headers || { "content-type": "application/json" };
    if (token) {
      if (!url.includes(HOST_SMS_PANAL)) {
        headersData.Authorization = token;
      }
      headersData.token = token;
    }
    if (permissions.length) {
      const perm = createPermissions(permissions);
      headersData.Permission = perm;
    }

    const axiosOptions = {
      url: url,
      method: type, // *GET, POST, PUT, DELETE, etc.
      mode: "no-cors", // no-cors, *cors, same-origin
      cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
      credentials: "same-origin", // include, *same-origin, omit
      headers: headersData,
      redirect: "follow", // manual, *follow, error
      referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    };

    if (type === "GET") {
      axiosOptions.params = additionalData;
    } else {
      axiosOptions.data = additionalData;
    }

    const response = await axios(axiosOptions);

    if (response.status === 200) {
      return { statusCode: 200, data: response.data };
    } else {
      return { statusCode: response.status, data: response.data };
    }
  } catch (error) {
    console.log("request failed-------------------->", error);

    return { statusCode: 500, data: error.response ? error.response.data : {} };
  }
}

// campaign trail find by order id, service number, profile number, email
export const getCampaignTrails = (params) => {
  switch (params.action) {
    case "findByOrderId":
      return apiRequest(
        `${CAMPAIGN}/v1/campaign-sync/campaign-history/findByOrderId`,
        "GET",
        params.payload,
        authToken,
        ["VIEW_CAMPAIGN_TRAIL"]
      );
    case "findByServiceNumber":
      return apiRequest(
        `${CAMPAIGN}/v1/campaign-sync/campaign-history/findByServiceNumber`,
        "GET",
        params.payload,
        authToken,
        ["VIEW_CAMPAIGN_TRAIL"]
      );
    case "findByProfileNumber":
      return apiRequest(
        `${CAMPAIGN}/v1/campaign-sync/campaign-history/findByProfileNumber`,
        "GET",
        params.payload,
        authToken,
        ["VIEW_CAMPAIGN_TRAIL"]
      );
    case "findByUserEmail":
      return apiRequest(
        `${CAMPAIGN}/v1/campaign-sync/campaign-history/findByUserEmail`,
        "GET",
        params.payload,
        authToken,
        ["VIEW_CAMPAIGN_TRAIL"]
      );
    default:
      break;
  }
};

//campaign trail get past successful orders
export const getPastSuccessfulOrders = (params) => {
  return apiRequest(
    `${CAMPAIGN}/v1/campaign-sync/campaign-history/getPastSuccessfulOrders`,
    "POST",
    params,
    authToken,
    ["VIEW_CAMPAIGN_TRAIL"]
  );
};

// get all custom keys
export const getCustomKeyView = async (params) => {
  let res = await apiRequest(
    `${CAMPAIGN}/v1/campaign-sync/custom-key-data`,
    "GET",
    {},
    authToken
  );
  if (params && typeof params.callback === "function") {
    params.callback();
  }
  return res;
};

// campaign view get all campaigns
export const getCampaignView = async (params) => {
  const { callback, ...data } = params;
  let res = await apiRequest(
    `${CAMPAIGN}/v1/campaign-sync/campaigns`,
    "POST",
    data,
    authToken,
    ["VIEW_CAMPAIGN"]
  );
  if (params && typeof params.callback === "function") {
    params.callback();
  }
  return res;
};

//create a campaign
export const createCampaign = (params) => {
  return apiRequest(
    `${CAMPAIGN}/v1/campaign-sync/campaign`,
    "POST",
    params,
    authToken,
    ["CREATE_CAMPAIGN"]
  );
};

//edit an existing campaign
export const editCampaign = (params) => {
  return apiRequest(
    `${CAMPAIGN}/v1/campaign-sync/campaign`,
    "PUT",
    params,
    authToken,
    ["EDIT_CAMPAIGN"]
  );
};

// get category and channel
export const getCampaignCategoryAndChannel = () => {
  return apiRequest(
    `${CAMPAIGN}/v1/campaign-sync/criteriaView`,
    "GET",
    {},
    authToken,
    ["VIEW_CAMPAIGN"]
  );
};

	//fetching transaction types
  export const getTransactionTypes = () => {
    return apiRequest(
      `${CAMPAIGN}/v2/campaign-sync/transactionTypes`,
      "GET",
      {},
      authToken,
      []
    );
  };
  
  // fetching domain types
  export const getDomainTypes = () => {
    return apiRequest(
      `${CAMPAIGN}/v2/campaign-sync/domainTypes`,
      "GET",
      {},
      authToken,
      []
    );
  };
  
  //fetch Event Triggers
  export const getEventTriggers = (params) => {
    return apiRequest(
      `${CAMPAIGN}/v2/campaign-sync/eventTriggers/${params}`,
      "GET",
      {},
      authToken,
      []
    );
  };
  
  //fetch possible rewards
  export const getPossibleRewards = (params) => {
    return apiRequest(
      `${CAMPAIGN}/v2/campaign-sync/possibleRewards`,
      "POST",
      params,
      authToken,
      []
    );
  };
  
  //fetch notification triggers
  export const getNotificationTriggers = (params) => {
    return apiRequest(
      `${CAMPAIGN}/v2/campaign-sync/notificationTriggers`,
      "POST",
      params,
      authToken,
      []
    );
  };


//get an existing campaign by id to display it in edit mode
export const getCampaignById = (params) => {
  return apiRequest(
    `${CAMPAIGN}/v1/campaign-sync/campaigns/${params}`,
    "GET",
    {},
    authToken,
    ["VIEW_CAMPAIGN"]
  );
};

//create activation campaign
export const createActivationCampaign = (params) => {
  return apiRequest(
    `${CAMPAIGN}/v1/campaign-sync/activation-campaign`,
    "POST",
    params,
    authToken,
    ["EDIT_CAMPAIGN"]
  );
};

//get an existing activation campaign by campaign id to display it in edit mode
export const getActivationCampaignById = (params) => {
  return apiRequest(
    `${CAMPAIGN}/v1/campaign-sync/activation-campaign/${params}`,
    "GET",
    {},
    authToken,
    ["VIEW_CAMPAIGN"]
  );
};

// return the list of campaign buckets
export const getCampaignBuckets = (params) => {
  return apiRequest(
    `${CAMPAIGN}/v2/campaign-sync/condition-buckets/${params}`,
    "GET",
    {},
    authToken,
    ["VIEW_CAMPAIGN"]
  );
};

//edit exiting activation campaign
export const editActivationCampaign = (params) => {
  return apiRequest(
    `${CAMPAIGN}/v1/campaign-sync/activation-campaign`,
    "PUT",
    params,
    authToken,
    ["EDIT_CAMPAIGN"]
  );
};

//create a campaign reward
export const createReward = (params) => {
  return apiRequest(
    `${CAMPAIGN}/v1/campaign-sync/reward`,
    "POST",
    params,
    authToken,
    ["EDIT_CAMPAIGN"]
  );
};

//delete an existcampaign reward
export const deleteReward = (params) => {
  return apiRequest(
    `${CAMPAIGN}/v1/campaign-sync/reward`,
    "DELETE",
    params,
    authToken,
    ["EDIT_CAMPAIGN"]
  );
};

//edit an existing campaign reward
export const editReward = (params) => {
  return apiRequest(
    `${CAMPAIGN}/v1/campaign-sync/reward`,
    "PUT",
    params,
    authToken,
    ["EDIT_CAMPAIGN"]
  );
};

//data for dropdown of menu to be shown at the time of creating or editing a campaign reward notification
export const getNotificationDropDown = () => {
  return apiRequest(
    `${CAMPAIGN}/v1/campaign-sync/notifications`,
    "GET",
    {},
    authToken,
    ["EDIT_CAMPAIGN"]
  );
};

//get existing campaign rewards
export const getCampaignRewards = (params) => {
  return apiRequest(
    `${CAMPAIGN}/v1/campaign-sync/rewards/${params}`,
    "GET",
    {},
    authToken,
    ["VIEW_CAMPAIGN"]
  );
};

//get conditions for cinditions tab
export const getConditions = (params) => {
  return apiRequest(
    `${CAMPAIGN}/v2/campaign-sync/condition-rules/${params}`,
    "GET",
    {},
    authToken,
    ["VIEW_CAMPAIGN"]
  );
};

//get conditions based on campaign id
export const getConditionsByCampaignId = (params) => {
  return apiRequest(
    `${CAMPAIGN}/v1/campaign-sync/conditions/${params}`,
    "GET",
    {},
    authToken,
    ["VIEW_CAMPAIGN"]
  );
};

export const getConditionsDetails = campaignId => {
  return apiRequest(
    `${CAMPAIGN}/v2/campaign-sync/campaign-conditions/${campaignId}`,
    "GET",
    {},
    authToken,
    ["VIEW_CAMPAIGN"]
  );
}

export const addConditionsBucket = (params) => {
  return apiRequest(
    `${CAMPAIGN}/v2/campaign-sync/conditionBucket`,
    "POST",
    params,
    authToken,
    ["EDIT_CAMPAIGN"]
  );
}
export const deleteConditionsBucket = (params) => {
  return apiRequest(
    `${CAMPAIGN}/v2/campaign-sync/conditionBucket`,
    "DELETE",
    params,
    authToken,
    ["EDIT_CAMPAIGN"]
  );
}


export const createCustomKey = (params) => {
  return apiRequest(
    `${CAMPAIGN}/v1/campaign-sync/create/customKey`,
    "POST",
    params,
    authToken,
    ["EDIT_CAMPAIGN_EMAIL_LIST"]
  );
};

export const uploadFile = (params) => {
  return apiRequest(
    `${CAMPAIGN}/v1/campaign-sync/uploadFile`,
    "POST",
    params,
    authToken,
    ["EDIT_CAMPAIGN_EMAIL_LIST"]
  );
};

export const getNotifications = (params) => {
  return apiRequest(
    `${CAMPAIGN}/v1/campaign-sync/notifications/${params}`,
    "GET",
    {},
    authToken,
    ["VIEW_CAMPAIGN"]
  );
};

export const createNotification = (params) => {
  return apiRequest(
    `${CAMPAIGN}/v1/campaign-sync/notification`,
    "POST",
    params,
    authToken,
    ["EDIT_CAMPAIGN"]
  );
};

export const deleteNotification = (params) => {
  return apiRequest(
    `${CAMPAIGN}/v1/campaign-sync/notification`,
    "DELETE",
    params,
    authToken,
    ["EDIT_CAMPAIGN"]
  );
};

export const editNotification = (params) => {
  return apiRequest(
    `${CAMPAIGN}/v1/campaign-sync/notification`,
    "PUT",
    params,
    authToken,
    ["EDIT_CAMPAIGN"]
  );
};

export const createConditions = (params) => {
  return apiRequest(
    `${CAMPAIGN}/v2/campaign-sync/save/campaign-conditions`,
    "POST",
    params,
    authToken,
    ["EDIT_CAMPAIGN"]
  );
};

export const createAudit = (params) => {
  return apiRequest(`${AUDIT}/audit/v1/create`, "POST", params, authToken);
};

export const getAudit = (params) => {
  return apiRequest(
    `${AUDIT}/audit/v1/getupdateaudits`,
    "POST",
    params,
    authToken
  );
};

export const getAuditCount = (params) => {
  return apiRequest(
    `${AUDIT}/audit/v1/getauditcount`,
    "POST",
    params,
    authToken
  );
};

export const getVariableCampaignData = campaignId => {
  return apiRequest(
    `${CAMPAIGN}/v1/campaign-sync/category-score/${campaignId}`,
    "GET",
    {},
    authToken
  );
}

export const postVariableCampaignData = payload => {
  return apiRequest(
    `${CAMPAIGN}/v1/campaign-sync/category-scores`,
    "POST",
    payload,
    authToken
  );
}

export const getVariableCashbackLimitsValues = () => {
  return apiRequest(
    `${CAMPAIGN}/v1/campaign-sync/variable-campaign/config`,
    "GET",
    {},
    authToken
  );
}

export const postVariableCashbackLimits = payload => {
  return apiRequest(
    `${CAMPAIGN}/v1/campaign-sync/variable-campaign/configs`,
    "POST",
    payload,
    authToken
  );
}

export const getSmsDomainList = () => {
  return apiRequest(
    `${HOST_SMS_PANAL}/smsMl/getDomain`,
    "GET",
    {},
    authToken
  );
}

export const updateSmsDomainList = payload => {
  return apiRequest(
    `${HOST_SMS_PANAL}/smsMl/updateDomain`,
    "POST",
    payload,
    authToken
  );
}

export const addSmsDomainList = payload => {
  return apiRequest(
    `${HOST_SMS_PANAL}/smsMl/addDomain`,
    "POST",
    payload,
    authToken
  );
}

//token

export const getSmsTokenList = () => {
  return apiRequest(
    `${HOST_SMS_PANAL}/smsMl/getToken?domain=all`,
    "GET",
    {},
    authToken
  );
}

export const updateSmsTokenList = payload => {
  return apiRequest(
    `${HOST_SMS_PANAL}/smsMl/updateToken`,
    "POST",
    payload,
    authToken
  );
}

export const addSmsTokenList = payload => {
  return apiRequest(
    `${HOST_SMS_PANAL}/smsMl/addToken`,
    "POST",
    payload,
    authToken
  );
}

// Txn Cateogry

export const getSmsTxnCategoryList = () => {
  return apiRequest(
    `${HOST_SMS_PANAL}/smsMl/getTransactionCategory`,
    "GET",
    {},
    authToken
  );
}

export const updateSmsTxnCategoryList = payload => {
  return apiRequest(
    `${HOST_SMS_PANAL}/smsMl/updateTransactionCategory`,
    "POST",
    payload,
    authToken
  );
}

export const addSmsTxnCategoryList = payload => {
  return apiRequest(
    `${HOST_SMS_PANAL}/smsMl/addTransactionCategory`,
    "POST",
    payload,
    authToken
  );
}

// Sender

export const getSmsSenderList = () => {
  return apiRequest(
    `${HOST_SMS_PANAL}/smsMl/getSender?page=0&noOfEntries=100000`,
    "GET",
    {},
    authToken
  );
}

export const updateSmsSenderList = payload => {
  return apiRequest(
    `${HOST_SMS_PANAL}/smsMl/updateSender`,
    "POST",
    payload,
    authToken
  );
}

export const addSmsSenderList = payload => {
  return apiRequest(
    `${HOST_SMS_PANAL}/smsMl/addSender`,
    "POST",
    payload,
    authToken
  );
}



// Disabled getDisabledUntrainedData

export const getSmsDisabledUntrainedList = () => {
  return apiRequest(
    `${HOST_SMS_PANAL}/smsMl/getInactiveUntrainedTemplates?page=0&noOfEntries=100`,
    "GET",
    {},
    authToken
  );
}

export const evaluateSmsTemplate = payload => {
  return apiRequest(
    `${HOST_SMS_PANAL}/smsMl/evaluateTrainedMessage`,
    "POST",
    payload,
    authToken
  );
}

export const updateSmsTemplate = payload => {
  return apiRequest(
    `${HOST_SMS_PANAL}/smsMl/updateTemplates`,
    "POST",
    payload,
    authToken
  );
}

export const deleteSmsTemplate = payload => {
  return apiRequest(
    `${HOST_SMS_PANAL}/smsMl/deleteTemplateByTemplate`,
    "POST",
    payload,
    authToken
  );
}

// Template
export const getTemplatesList = (params) => {
  return apiRequest(
    `${HOST_SMS_PANAL}/smsMl/getTemplates`,
    "GET",
    params,
    authToken
  );
}

export const getStringSimilarityList = (params) => {
  return apiRequest(
    `${HOST_SMS_PANAL}/smsMl/getStringSimilarityTemplates`,
    "GET",
    params,
    authToken
  );
}
// Template
export const getTrainedMessageCount = (params) => {
  return apiRequest(
    `${HOST_SMS_PANAL}/smsMl/getTrainedMessageCount`,
    "GET",
    params,
    authToken
  );
}

export const getUnTrainedMessageCount = (params) => {
  return apiRequest(
    `${HOST_SMS_PANAL}/smsMl/getUntrainedMessageCount`,
    "GET",
    params,
    authToken
  );
}

export const getStringSimilarityMessageCount = (params) => {
  return apiRequest(
    `${HOST_SMS_PANAL}/smsMl/stringSimilarityMessageCount`,
    "GET",
    params,
    authToken
  );
}

export const getShortcodeList = (params) => {
  return apiRequest(
    `${HOST_SMS_PANAL}/smsMl/getShortCodeCounter`,
    "GET",
    params,
    authToken
  );
}

// Template  Class API's

export const createTemplateClass = payload => {
  return apiRequest(
    `${CAMPAIGN}/v1/campaign-sync/generate/templateId`,
    "POST",
    payload,
    authToken,
    ['TEMPLATE_CLASS_EDIT']
  );
}


export const updateTemplateClass = payload => {
  return apiRequest(
    `${CAMPAIGN}/v1/campaign-sync/update/template`,
    "POST",
    payload,
    authToken,
    ['TEMPLATE_CLASS_EDIT']
  );
}


export const getTemplateClassById = (params, templateID) => {

  return apiRequest(
    `${CAMPAIGN}/v2/campaign-sync/promoTemplate/${templateID}`,
    "GET",
    params,
    authToken,
    ['TEMPLATE_CLASS_VIEW']
  );

};

export const getAllTemplateClass = (params) => {

  return apiRequest(
    `${CAMPAIGN}/v2/campaign-sync/templateIds/false`,
    "GET",
    params,
    authToken,
    ['TEMPLATE_CLASS_VIEW']
  );

};

export const getLiveTemplateClass = (params) => {

  return apiRequest(
    `${CAMPAIGN}/v2/campaign-sync/templateIds/true`,
    "GET",
    params,
    authToken,
    ['TEMPLATE_CLASS_VIEW']
  );

};

// Coupons


export const generateCoupons = payload => {
  return apiRequest(
    `${CAMPAIGN}/v2/campaign-sync/generateCoupons`,
    "POST",
    payload,
    authToken,
    ['TEMPLATE_COUPONS']
  );
}

export const uploadCoupons = payload => {
  const headers =
    { 'content-type': 'multipart/form-data' }

  return apiRequest(
    `${CAMPAIGN}/v2/campaign-sync/uploadCoupons`,
    "POST",
    payload,
    authToken,
    ['TEMPLATE_COUPONS'],
    headers
  );
}

export const deleteCoupons = payload => {
  const headers =
    { 'content-type': 'multipart/form-data' }
  return apiRequest(
    `${CAMPAIGN}/v2/campaign-sync/deleteCoupons`,
    "POST",
    payload,
    authToken,
    ['TEMPLATE_COUPONS'],
    headers
  );
}



export const viewCoupon = payload => {
  return apiRequest(
    `${CAMPAIGN}/v2/campaign-sync/uploadedCoupons`,
    "POST",
    payload,
    authToken,
    ['TEMPLATE_COUPONS']
  );
}

export const getCouponStatus = (params) => {
  return apiRequest(
    `${CAMPAIGN}/v2/campaign-sync/couponStatus/${params}`,
    "GET",
    {},
    authToken,
    ["VIEW_CAMPAIGN"]
  );
};

// bulk-refund

export const downloadSampleFile = (params) => {

  return apiRequest(
    `${OLDPANEL}/util/getBulkOmsRefundSampleFiles`,
    "GET",
    params,
    authToken,
    []
  );


};

export const uploadSelectedFile = payload => {
  const headers =
    { 'content-type': 'multipart/form-data' }
  return apiRequest(
    `${OLDPANEL}/bulkprocess/upload`,
    "POST",
    payload,
    authToken,
    [],
    headers
  );

}

export const viewOutputFileStatus = payload => {

  return apiRequest(
    `${OLDPANEL}/bulkprocess/listPage`,
    "POST",
    payload,
    authToken,
    []
  );

}

export const downloadResultFile = (params) => {
  const headers =
  {
    'Content-type': 'application/json;charset=UTF-8',
    'emailId': JSON.parse(localStorage.getItem('ls.user')).email
  }

  return apiRequest(
    `${OLDPANEL}/bulkprocess/download?fileName=${params.fileName}&userId=${params.userId}&activityId=${params.activityId}&isInputFile=${params.isInputFile}`,
    "POST",
    params,
    authToken,
    [],
    headers
  );

}
// closed user group

export const createClosedUser = payload => {
  return apiRequest(
    `${CAMPAIGN}/v2/campaign-sync/closedGroupUser?emailId=${payload.emailId}`,
    "POST",
    {},
    authToken,
    ["EDIT_CLOSED_USER_GROUP"]
  );
}

export const getClosedUsers = () => {
  return apiRequest(
    `${CAMPAIGN}/v2/campaign-sync/closedGroupUser`,
    "GET",
    {},
    authToken,
    ["VIEW_CLOSED_USER_GROUP"]
  );
}

export const deleteClosedUser = (params) => {
  return apiRequest(
    `${CAMPAIGN}/v2/campaign-sync/closedGroupUser?id=${params.id}`,
    "DELETE",
    {},
    authToken,
    ["EDIT_CLOSED_USER_GROUP"]
  );
}

//  upload folder / landing page


export const uploadFolderS3 = payload => {
  const headers =
    { 'content-type': 'multipart/form-data; boundary=<calculated when request is sent>' }

  return apiRequest(
    `${CAMPAIGN}/v2/campaign-sync/uploadFolderS3`,
    "POST",
    payload,
    authToken,
    [],
    headers
  );
}

export const deleteFolderS3 = (params) => {
  return apiRequest(
    `${CAMPAIGN}/v2/campaign-sync/delete/foldersS3?folderName=${params.folderName}`,
    "DELETE",
    {},
    authToken,
    []
  );
}

// activation history of the user

export const activationHistoryUser = payload => {
  return apiRequest(
    `${CAMPAIGN}/v2/campaign-sync/activationHistory`,
    "POST",
    payload,
    authToken,
    ["VIEW_ACTIVATION_HISTORY"]
  );
}
  


// amc onboarding 


export const amcListing = () => {
  const headers =
  {
    'Content-type': 'application/json;charset=UTF-8',
    'emailId': JSON.parse(localStorage.getItem('ls.user')).email,
    'opsToken': authToken
  }
  return apiRequest(
    `${AMC}/rest/mutualFund/nosession/pwa/v1/amcListOps`,
    "GET",
    {},
    '',
    [],
    headers
  );
}

export const amcPosting = payload => {

  const headers =
  {
    'Content-type': 'application/json;charset=UTF-8',
    'emailId': JSON.parse(localStorage.getItem('ls.user')).email,
    'opsToken': authToken
  }
  return apiRequest(
    `${AMC}/rest/mutualFund/nosession/pwa/v1/amcOnboarding`,
    "POST",
    payload,
    '',
    [],
    headers
  );
}




// biller management system

export const getBillerCategory = (params = {}) => {
  return apiRequest(
    `${AUDIT}/catalog/getAllCategory`,
    "GET",
    params,
    authToken,
    ["BILLER_MANAGEMENT_VIEW"]
  );


}

export const getBillerListByShortCode = (params) => {
  return apiRequest(
    `${AUDIT}/catalog/biller/list/${params.codeValue}`,
    "GET",
    params,
    authToken,
    ["BILLER_MANAGEMENT_VIEW"]
  );
}

export const getBlockedBillerDetails = (params) => {
  return apiRequest(
    `${AUDIT}/catalog/blocked/biller/detail`,
    "GET",
    params,
    authToken,
    ["BILLER_MANAGEMENT_VIEW"]
  );
}


export const blockBiller = payload => {
  return apiRequest(
    `${AUDIT}/catalog/blocked/biller`,
    "POST",
    payload,
    authToken,
    ["BILLER_MANAGEMENT_EDIT"]
  );
}



// kp txn
export const getSummaryData = (params) => {
  return apiRequest(
    `${KP}/rest/transactionView/getTransactionSummaryData`,
    "POST",
    params,
    authToken,
    []
  );
}

export const getTransactionData = (params) => {
  return apiRequest(
    `${KP}/rest/transactionView/getTransactionViewData`,
    "POST",
    params,
    authToken,
    []
  );
}

export const getTransactionDetailedView = (params) => {
  return apiRequest(
    `${KP}/rest/transactionView/getTransactionDetailedViewByMtxnId?mtxnId=${params}`,
    "POST",
    params,
    authToken,
    []
  );
}
  

// base upload

export const insertBaseUpload = (payload, passKey) => {
  const headers =
  {
    'content-type': 'multipart/form-data; boundary=<calculated when request is sent>',
    passKey
  }

  return apiRequest(
    `${CONSUMER}/debitEmi/uploadOfferFile`,
    "POST",
    payload,
    authToken,
    ["BASE_UPLOAD_INSERT"],
    headers
  );

}

export const checkBaseUpload = payload => {
  return apiRequest(
    `${CONSUMER}/debitEmi/checkProductOffers`,
    "POST",
    payload,
    authToken,
    ["BASE_UPLOAD_CHECK"]
  );
}
//  chatbot

export const listChatbot = payload => {
  return apiRequest(
    `${AUDIT}/chatbot/getConfig`,
    "GET",
    payload,
    authToken,
    ["CHATBOT_VIEW"]
  );
}


export const addChatbot = payload => {
  return apiRequest(
    `${AUDIT}/chatbot/addConfig`,
    "POST",
    payload,
    authToken,
    ["CHATBOT_EDIT"]
  );
}


export const updateChatbot = payload => {
  return apiRequest(
    `${AUDIT}/chatbot/update`,
    "POST",
    payload,
    authToken,
    ["CHATBOT_EDIT"]
  );
}




// vernost integration

export const getCustomerOrders = payload => {
  return apiRequest(
    `${OLDPANEL}/vernost/searchOrder`,
    "POST",
    payload,
    authToken,
    []
  );

}

export const getPartners = payload => {
  return apiRequest(
    `${OLDPANEL}/vernost/merchant`,
    "POST",
    payload,
    authToken,
    []
  );

}

export const getOfferDetails = payload => {
  return apiRequest(
    `${OLDPANEL}/vernost/searchOfferDetails`,
    "POST",
    payload,
    authToken,
    []
  );

}

export const downloadStatement = payload => {
  return apiRequest(
    `${OLDPANEL}/vernost/searchOrderStatement`,
    "POST",
    payload,
    authToken,
    []
  );

}
// Bulk refund pay later

export const downloadSampleFilePayLater = (params) => {

  return apiRequest(
    `${OLDPANEL}/util/getBulkDecisionEngineSampleFile`,
    "GET",
    params,
    authToken,
    []
  );
}



// unsubscribe-automation

export const downloadGeneralFile = (params) => {

  return apiRequest(
    `${OLDPANEL}/util/getSampleFiles`,
    "GET",
    params,
    authToken,
    []
  );

};

export const viewLogs = (params) => {


  return apiRequest(
    `${OLDPANEL}/notificationops/unsubscribe/fetchUsers`,
    "GET",
    {
      "fromDateTime": params.fromDate,
      "toDateTime": params.toDate
    },
    authToken,
    []
  );

}

export const getRestrictions = (params) => {


  return apiRequest(
    `${OLDPANEL}/notificationops/unsubscribe/getRestrictions`,
    "GET",
    {},
    authToken,
    []
  );

}

export const downloadLogs = (params) => {


  return apiRequest(
    `${OLDPANEL}/notificationops/unsubscribe/download`,
    "GET",
    {
      "fromDateTime": params.fromDate.trim(),
      "toDateTime": params.toDate.trim()
    },
    authToken,
    []
  );

}

export const searchUsers = (params) => {


  return apiRequest(
    `${OLDPANEL}/notificationops/unsubscribe/searchUsers`,
    "POST",
    params,
    authToken,
    []
  );

}

export const createUsers = (params) => {


  return apiRequest(
    `${OLDPANEL}/notificationops/unsubscribe/users`,
    "POST",
    params,
    authToken,
    []
  );

}

// BQR

export const generateBQR = (payload) => {
  const headers =
  {
    'content-type': 'multipart/form-data; boundary=<calculated when request is sent>'
  }
  return apiRequest(
    `${AUDIT}/api/v1/bulk/generateMpan`,
    "POST",
    payload,
    authToken,
    ["BQR_EDIT"],
    headers
  );
}


export const getBqrGenHistoryForUser = (params) => {
  return apiRequest(
    `${AUDIT}/api/v1/getBqrGenHistoryForUser`,
    "GET",
    params,
    authToken,
    ["BQR_VIEW"]
  );
}


export const downloadBulkFile = (params) => {
  return apiRequest(
    `${AUDIT}/api/v1/downloadBulkFile`,
    "POST",
    params,
    authToken,
    ["BQR_VIEW"]
  );
}

export const getQRType = (params) => {
  return apiRequest(
    `${AUDIT}/api/v1/getAllUIData`,
    "GET",
    params,
    authToken,
    ["BQR_VIEW"]
  );
}


// sms notification api

export const createSmsNotification = payload => {
  return apiRequest(
    `${NOTIFICATION}/notification/internal/create/sms/template`,
    "POST",
    payload,
    authToken,
    ['SMS_NOTIFICATION_EDIT']
  );
}


export const updateSmsNotification = payload => {
  return apiRequest(
    `${NOTIFICATION}/notification/internal/update/sms`,
    "POST",
    payload,
    authToken,
    ['SMS_NOTIFICATION_EDIT']
  );
}


export const getSmsNotificationById = (params, smsId) => {

  return apiRequest(
    `${NOTIFICATION}/notification/internal/getsmstemplate/${smsId}`,
    "GET",
    params,
    authToken,
    ['SMS_NOTIFICATION_VIEW']
  );

};

export const getAllSmsNotification = (params) => {

  return apiRequest(
    `${NOTIFICATION}/notification/internal/get/sms/all`,
    "POST",
    params,
    authToken,
    ['SMS_NOTIFICATION_VIEW']
  );

};

// email notification api

export const createEmailNotification = payload => {
  return apiRequest(
    `${NOTIFICATION}/notification/internal/create/email/template`,
    "POST",
    payload,
    authToken,
    ['EMAIL_NOTIFICATION_EDIT']
  );
}


export const updateEmailNotification = payload => {
  return apiRequest(
    `${NOTIFICATION}/notification/internal/update/email`,
    "POST",
    payload,
    authToken,
    ['EMAIL_NOTIFICATION_EDIT']
  );
}

export const pushEmailNotification = payload => {
  return apiRequest(
    `${NOTIFICATION}/notification/internal/sendbatch/push/notification`,
    "POST",
    payload,
    authToken,
    ['EMAIL_NOTIFICATION_EDIT']
  );
}


export const getEmailNotificationById = (params, emailId) => {

  return apiRequest(
    `${NOTIFICATION}/notification/internal/getemailtemplate/${emailId}`,
    "GET",
    params,
    authToken,
    ['EMAIL_NOTIFICATION_VIEW']
  );

};

export const getAllEmailNotification = (params) => {

  return apiRequest(
    `${NOTIFICATION}/notification/internal/get/email/all`,
    "POST",
    params,
    authToken,
    ['EMAIL_NOTIFICATION_VIEW']
  );

};


// Banner notification api

export const createBannerNotification = payload => {
  return apiRequest(
    `${NOTIFICATION}/notification/internal/banner/save`,
    "POST",
    payload,
    authToken,
    ['BANNER_NOTIFICATION_EDIT']
  );
}


export const updateBannerNotification = payload => {
  return apiRequest(
    `${NOTIFICATION}/notification/internal/banner/update`,
    "POST",
    payload,
    authToken,
    ['BANNER_NOTIFICATION_EDIT']
  );
}


export const getBannerNotificationById = (body) => {

  return apiRequest(
    `${NOTIFICATION}/notification/internal/get/banner/notification/id`,
    "POST",
    body,
    authToken,
    ['BANNER_NOTIFICATION_VIEW']
  );

};

export const getAllBannerNotification = (params) => {

  return apiRequest(
    `${NOTIFICATION}/notification/internal/banner/getbanners`,
    "POST",
    params,
    authToken,
    ['BANNER_NOTIFICATION_VIEW']
  );

};

// Ios notification api

export const createIosNotification = payload => {
  return apiRequest(
    `${NOTIFICATION}/notification/internal/create/push/ios/template`,
    "POST",
    payload,
    authToken,
    ['IOS_NOTIFICATION_EDIT']
  );
}


export const updateIosNotification = payload => {
  return apiRequest(
    `${NOTIFICATION}/notification/internal/update/push/ios/template`,
    "POST",
    payload,
    authToken,
    ['IOS_NOTIFICATION_EDIT']
  );
}


export const getIosNotificationById = (body) => {

  return apiRequest(
    `${NOTIFICATION}/notification/internal/get/ios/push/template/id`,
    "POST",
    body,
    authToken,
    ['IOS_NOTIFICATION_VIEW']
  );

};

export const getAllIosNotification = (params) => {

  return apiRequest(
    `${NOTIFICATION}/notification/internal/get/push/ios/template`,
    "POST",
    params,
    authToken,
    ['IOS_NOTIFICATION_VIEW']
  );

};


// Android notification api

export const createAndroidNotification = payload => {
  return apiRequest(
    `${NOTIFICATION}/notification/internal/create/push/android/template`,
    "POST",
    payload,
    authToken,
    ['ANDROID_NOTIFICATION_EDIT']
  );
}


export const updateAndroidNotification = payload => {
  return apiRequest(
    `${NOTIFICATION}/notification/internal/update/push/android/template`,
    "POST",
    payload,
    authToken,
    ['ANDROID_NOTIFICATION_EDIT']
  );
}


export const getAndroidNotificationById = (body) => {

  return apiRequest(
    `${NOTIFICATION}/notification/internal/get/android/push/template/id`,
    "POST",
    body,
    authToken,
    ['ANDROID_NOTIFICATION_VIEW']
  );

};

export const getAllAndroidNotification = (params) => {

  return apiRequest(
    `${NOTIFICATION}/notification/internal/get/all/pushandroid/template`,
    "POST",
    params,
    authToken,
    ['ANDROID_NOTIFICATION_VIEW']
  );

};


export const getVpaDetails = (params) => {

  return apiRequest(
    `${AUDIT}/searchBarSingleAgent/action/upi/vpa/`,
    "POST",
    params,
    authToken,
    []
  );

};

export const downloadPayableSampleFile = () => {

  return apiRequest(
    `${OLDPANEL}/util/payableBalance/samplefile`,
    "GET",
    {},
    authToken,
    []
  );


};

export const singlePBRequest = (params) => {

  return apiRequest(
    `${OLDPANEL}/corpLoad/payableBalance/timestamp`,
    "POST",
    params,
    authToken,
    []
  );


};

export const downloadUnknownTXNSampleFile = () => {

  return apiRequest(
    `${OLDPANEL}/getBulkUnknownRefundSampleFile`,
    "GET",
    {},
    authToken,
    []
  );


};


// FOS Agent Dashboard

export const getAgentList = (payload) => {
  return apiRequest(
    `${AUDIT}/api/v1/searchAgent`,
    "POST",
    payload,
    authToken,
    [],
  );
}

export const addAgentDetails = (payload) => {
  return apiRequest(
    `${AUDIT}/api/v1/addAgentDetails`,
    "POST",
    payload,
    authToken,
    [],
  );
}

export const changeAgentStatus = (payload) => {
  return apiRequest(
    `${AUDIT}/api/v1/changeAgentStatus`,
    "POST",
    payload,
    authToken,
    [],
  );
}

export const updateAgentDetails = (payload) => {
  return apiRequest(
    `${AUDIT}/api/v1/updateAgentDetails`,
    "POST",
    payload,
    authToken,
    [],
  );
}


export const downloadSplashSampleFile = () => {

  return apiRequest(
    `${AUDIT}/util/download/global/splash/user/exclusion/samplefile`,
    "GET",
    {},
    authToken,
    []
  );


};


export const dynamicDownloadSampleFile = (urlPath, params = {}) => {
  return apiRequest(
    `${AUDIT}/util/${urlPath}`,
    "GET",
    params,
    authToken,
    []
  );


};

export const uploadSelectedAMLFile = (payload ,activityId) => {
  const headers =
    { 'content-type': 'multipart/form-data' }
  return apiRequest(
    `${AUDIT}/bulkprocess/aml/file/upload?activityid=${activityId}`,
    "POST",
    payload,
    authToken,
    [],
    headers
  );

}
