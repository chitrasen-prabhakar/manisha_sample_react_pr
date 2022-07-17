import { CUSTOM_KEY_VIEW } from "./customKeyView.constants";

export default (
  state = { payload: {}, error: null, isLoading: false },
  action
) => {
  switch (action.type) {
    case CUSTOM_KEY_VIEW.REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case CUSTOM_KEY_VIEW.FAILURE:
      return {
        ...state,
        ...{ error: action.error },
        isLoading: false,
      };
    case CUSTOM_KEY_VIEW.SUCCESS:
      return {
        ...state,
        ...{ payload: action.payload },
        isLoading: false,
      };
    default:
      return state;
  }
};
