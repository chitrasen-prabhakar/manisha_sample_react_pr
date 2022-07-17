const REQUEST = "REQUEST";
const SUCCESS = "SUCCESS";
const FAILURE = "FAILURE";

// for parameter base="CATEGORY_FAQS" returns the following object
// {
//  FAILURE: "CATEGORY_FAQS_FAILURE"
//  REQUEST: "CATEGORY_FAQS_REQUEST"
//  SUCCESS: "CATEGORY_FAQS_SUCCESS"
// }
export function createRequestTypes(base) {
  return [REQUEST, SUCCESS, FAILURE].reduce((acc, type) => {
    acc[type] = `${base}_${type}`;
    return acc;
  }, {});
}

export function action(type, payload = {}) {
  return { type, ...payload };
}
