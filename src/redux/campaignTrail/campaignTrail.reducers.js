import { CAMPAIGN_TRAIL } from "./campaignTrail.constants";

export default (
  state = { payload: {}, error: null, isLoading: false },
  action
) => {
  switch (action.type) {
    case CAMPAIGN_TRAIL.REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case CAMPAIGN_TRAIL.FAILURE:
      return {
        ...state,
        ...{ error: action.error },
        isLoading: false,
      };
    case CAMPAIGN_TRAIL.SUCCESS:
      return {
        ...state,
        ...{ payload: action.payload },
        isLoading: false,
      };
    default:
      return state;
  }
};
