import { CUSTOM_KEY_VIEW } from "./customKeyView.constants";
import { action } from "src/utils/requestActions";

export function requestCustomKeyView(payload) {
  return action(CUSTOM_KEY_VIEW.REQUEST, payload);
}
