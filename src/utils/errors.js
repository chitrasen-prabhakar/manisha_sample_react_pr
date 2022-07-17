import { message } from "antd";
import { isEmptyObject } from "src/utils";
/**
 * 
 * @param {*} res 
 * @param {*} errVarName 
 */
export const generalErrorHandler = (res, errVarName = SERVER_ERROR) => {
  if (res.statusCode === 401) {
    message.error(
      "OOPS! You don't see to be logged in. Please wait while we redirect you to the login page",
      8
    );
    window.location.href = window.location.origin;
  } else if (res.statusCode === 403) {
    message.error(
      "You ARE NOT AUTHORIZED to perform this action. Please contact the admin team for permissions",
      8
    );
  } else {
    if (res.data.exception && res.data.exception.message) {
      message.error(res.data.exception.message, 8);
    } else if(res.data.error) {
      message.error(res.data.error, 8);
    }else {
      message.error(errVarName, 8);
    }
  }
};
/**
 * 
 * @param {*} res 
 * @returns 
 */
export const reduxErrorHandler = (res) => {
  if (typeof res !== "undefined" && !isEmptyObject(res.payload) && !res.isLoading) {
    const statusCode = res.payload.statusCode;
    if (statusCode === 401) {
      message.error(
        "OOPS! You don't see to be logged in. Please wait while we redirect you to the login page",
        8
      );
      window.location.href = window.location.origin;
    } else if (statusCode === 403) {
      message.error(
        "You ARE NOT AUTHORIZED to perform this action. Please contact the admin team for permissions",
        8
      );
      return 403;
    } else if (statusCode >= 500) {
      message.error(SERVER_ERROR, 8);
    }
  }
};



export const SERVER_ERROR =
  "OOPS! Something went wrong. Please try again later.";

export const SERVER_PAGE_ERROR =
  "OOPS! Something went wrong. Please make sure the URL you are trying to access is correct or try again later.";


