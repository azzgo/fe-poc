import { handleAction } from "redux-actions";
import { actionTypes } from "src/actions/actionTypes";

export const demoReducer = handleAction(
  actionTypes.demo, 
  (state: number) => {
    return state + 1;
  },
  0
)
