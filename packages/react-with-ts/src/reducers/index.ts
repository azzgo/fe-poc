import { combineReducers } from 'redux'
import notesReducer, { INoteState } from 'src/reducers/notesReducer'

import { reducer as toastr, ToastrState } from 'react-redux-toastr'
import authReducer, { IAuthState } from 'src/reducers/authReducer'

export interface IStoreState {
  auth: IAuthState,
  notes: INoteState
  toastr: ToastrState
}

const rootReducerMapping = {
  auth: authReducer,
  notes: notesReducer,
  toastr,
}

export default combineReducers<IStoreState>(rootReducerMapping)
