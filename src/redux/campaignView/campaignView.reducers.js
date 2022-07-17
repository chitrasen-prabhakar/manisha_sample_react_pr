import { CAMPAIGN_VIEW } from "./campaignView.constants";

function pages(state = { payload: {}, error: null, isLoading: false }, action) {
  switch (action.type) {
    case CAMPAIGN_VIEW.REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case CAMPAIGN_VIEW.FAILURE:
      return {
        ...state,
        ...{ error: action.error },
        isLoading: false,
      };
    case CAMPAIGN_VIEW.SUCCESS:
      return {
        ...state,
        ...{ payload: action.payload },
        isLoading: false,
      };
    default:
      return state;
  }
}

export default (state = {}, action) => {
  switch (action.type) {
    case CAMPAIGN_VIEW.REQUEST:
    case CAMPAIGN_VIEW.FAILURE:
    case CAMPAIGN_VIEW.SUCCESS:
      return {
        ...state,
        [action.params.pageNumber]: pages(
          state[action.params.pageNumber],
          action
        ),
      };
    case CAMPAIGN_VIEW.RESET:
      return {};
    default:
      return state;
  }
};
