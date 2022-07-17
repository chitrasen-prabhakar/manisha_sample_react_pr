import { LMS_HOST,LD_HOST } from "../../index";

export const GET_LEAD_DATA = (params) => `${LMS_HOST}/lead/getLead${params}`;
export const GET_LEAD_FILTER = () => `${LMS_HOST}/lead/getFilter`;
export const GET_MODEL_DATA = () => `${LMS_HOST}/lead/getModelData`;
export const SAVE_LEAD_DATA = () => `${LMS_HOST}/frontendlead`;
export const GET_STATE_LIST = () => `${LMS_HOST}/lead/getStateList`;
export const GET_CITY_LIST = () => `${LMS_HOST}/lead/getCityList`;
export const GET_MAKE_LIST = () => `${LMS_HOST}/lead/getMakeList`;
export const GET_FULL_LEAD_DATA = () => `${LMS_HOST}/lead/getFullLead`;
export const UPDATE_LEAD_TO_SMS = () => `${LMS_HOST}/lead/updateLeadToLms`;




