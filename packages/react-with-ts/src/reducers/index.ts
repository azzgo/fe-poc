import { combineReducers } from "redux";
import { demoReducer } from "src/reducers/demoReducer";



export default combineReducers({
  demo: demoReducer
})