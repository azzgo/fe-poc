import { combineReducers } from 'redux'
import notesReducer, { INoteState } from 'src/reducers/notesReducer'

import authReducer, { IAuthState } from 'src/reducers/authReducer'

export interface IStoreState {
  auth: IAuthState,
  notes: INoteState
}

const rootReducerMapping = {
  auth: authReducer,
  notes: notesReducer,
}

export default combineReducers<IStoreState>(rootReducerMapping)
