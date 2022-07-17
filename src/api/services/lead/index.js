import { apiRequest } from "../../index";
import {
  GET_LEAD_DATA,
  GET_LEAD_FILTER,
  GET_MODEL_DATA,
  SAVE_LEAD_DATA,
  GET_STATE_LIST,
  GET_CITY_LIST,
  GET_MAKE_LIST,
  GET_FULL_LEAD_DATA,
  UPDATE_LEAD_TO_SMS
} from "./urls"

export const getLeadData = (params,query) => {
  return apiRequest(
    {
      url: GET_LEAD_DATA(query),
      type: "POST",
      params
    }
  );
};

export const getLeadFilters = () => {
  return apiRequest(
    {
      url: GET_LEAD_FILTER(),
      type: "GET"
    }
  );
};
export const getModelData = (params) => {
  return apiRequest(
    {
      url: GET_MODEL_DATA(),
      type: "POST",
      params
    }
  );
};

export const saveLeadData = (params) => {
  return apiRequest(
    {
      url: SAVE_LEAD_DATA(),
      type: "POST",
      params
    }
  );
};
export const fetchStateList = () => {
  return apiRequest(
    {
      url: GET_STATE_LIST(),
      type: "GET"
    }
  );
};

export const fetchCityList = (params) => {
  return apiRequest(
    {
      url: GET_CITY_LIST(),
      type: "POST",
      params
    }
  );
};

export const getMakeData = (params) => {
  return apiRequest(
    {
      url: GET_MAKE_LIST(),
      type: "GET"
      
    }
  );
};
export const getFullLeadData = (params) => {
  return apiRequest(
    {
      url: GET_FULL_LEAD_DATA(),
      type: "POST",
      params
    }
  );
};
export const updateLeadToLms = (params) => {
  return apiRequest(
    {
      url: UPDATE_LEAD_TO_SMS(),
      type: "POST",
      params
    }
  );
};

// export const getUpiErrorSearchData = (params) => {
//   return apiRequest(
//     {
//       url: GET_UPI_ERROR_SEARCH_DATA(params.errorCode),
//       type: "GET"
//     }
//   );
// };

// export const deleteUpiErrorData = (requestBody) => {
//   return apiRequest({
//     url: DELETE_UPI_ERROR,
//     type: "POST",
//     params: requestBody
//   })
// }

// export const updateUPIErrorData = (requestBody) => {
//   return apiRequest({
//     url: UPDATE_UPI_ERROR,
//     type: "POST",
//     params: requestBody
//   })
// }

// export const downloadSampleErrorFile = (params) => {

//   return apiRequest({
//     url : GET_SAMPLE_ERROR_FILE,
//     type: "GET",
//     params,
//     permissions: []
// });


// };

// export const getUPITransactionData = (params) => {
//   return apiRequest(
//     {
//       url: GET_UPI_TRANSACTION_DATA,
//       type: "POST",
//       params,
//       token:true,
//       permissions: ['']
//     }
//   );
// };

// export const singleRefundTxn = (params) => {

//   return apiRequest({
//     url : SINGLE_REFUND_TRANSACTION,
//     type: "POST",
//     params,
//     permissions: []
// });

// }

// export const singleRefund = (params) => {

//   return apiRequest({
//     url : SINGLE_REFUND,
//     type: "POST",
//     params,
//     permissions: []
// });

// }


// export const singleRefundStatus = (params) => {

//   return apiRequest({
//     url : SINGLE_REFUND_STATUS,
//     type: "POST",
//     params,
//     permissions: []
// });

// }
