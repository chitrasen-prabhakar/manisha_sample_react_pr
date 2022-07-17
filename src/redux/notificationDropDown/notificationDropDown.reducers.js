import { NOTIFICATION_DROP_DOWN } from "./notificationDropDown.constants";

export default (
  state = { payload: {}, error: null, isLoading: false },
  action
) => {
  switch (action.type) {
    case NOTIFICATION_DROP_DOWN.REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case NOTIFICATION_DROP_DOWN.FAILURE:
      return {
        ...state,
        ...{ error: action.error },
        isLoading: false,
      };
    case NOTIFICATION_DROP_DOWN.SUCCESS:
      return {
        ...state,
        ...{ payload: action.payload },
        isLoading: false,
      };
    default:
      return state;
  }
};
