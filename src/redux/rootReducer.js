import { combineReducers } from "redux";

import { HYDRATE } from "next-redux-wrapper";

import campaignTrailReducer from "./campaignTrail/campaignTrail.reducers";
import campaignViewReducer from "./campaignView/campaignView.reducers";
import notificationDropDownReducer from "./notificationDropDown/notificationDropDown.reducers";
import customKeyViewReducer from "./customKeyView/customKeyView.reducers";

const combinedReducer = combineReducers({
  campaignTrail: campaignTrailReducer,
  campaignView: campaignViewReducer,
  notificationDropDown: notificationDropDownReducer,
  customKeyView: customKeyViewReducer
});

const rootReducer = (state, action) => {
  if (action.type === HYDRATE) {
    const nextState = {
      ...state, // use previous state
      ...action.payload, // apply delta from hydration
    };
    // if (state.faqCategories && state.faqCategories.payload.length > 0)
    // nextState.faqCategories = state.faqCategories; // preserve categories on client side navigation
    return nextState;
  } else {
    return combinedReducer(state, action);
  }
};

export default rootReducer;

// https://github.com/vercel/next.js/blob/canary/examples/with-redux-wrapper/store/store.js
