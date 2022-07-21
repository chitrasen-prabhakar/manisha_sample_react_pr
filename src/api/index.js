//lib imports
import { put, call } from "redux-saga/effects";
const axios = require("axios");

export const authToken =
  typeof window !== "undefined" &&
  window.localStorage &&
  window.localStorage.getItem("ls.user") &&
  JSON.parse(window.localStorage.getItem("ls.user")).token &&
  JSON.parse(window.localStorage.getItem("ls.user")).token.token;

export const authEmail =
  typeof Storage !== "undefined"
    ? localStorage.getItem("ls.emailId")
    : null;

// export const HOST = "http://10.220.21.229:8080";
// export const HOST_OPS = "http://10.252.5.76:8080";

export const LMS_HOST = process.env.NEXT_PUBLIC_LMS_HOST//"https://stagelmsapi.driviocaptial.com/v1";
export const LD_HOST = process.env.NEXT_PUBLIC_LD_HOST//"https://stageld.driviocaptial.com/v1";

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


/**
 * 
 * @param {*} param0 
 * @returns 
 */
export async function apiRequest(
  { url = "",
    type,
    params = {},
    token,
    permissions = [],
    headers }
) {
  try {
    const headersData = headers || { "content-type": "application/json" };

    if (token || authToken) {
      headersData.Authorization = token || authToken;
      headersData.token = token || authToken;
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
      axiosOptions.params = params;
    } else {
      axiosOptions.data = params;
      
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