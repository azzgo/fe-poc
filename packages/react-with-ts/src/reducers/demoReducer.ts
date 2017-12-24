import { handleAction } from "redux-actions";
import { actionTypes } from "src/actions/actionTypes";

export const demoReducer = handleAction(
  actionTypes.demo, 
  (state: number) => {
    return 1;
  },
  0
)
