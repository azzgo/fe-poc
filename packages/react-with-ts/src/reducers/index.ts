import { combineReducers } from 'redux'
import notesReducer from 'src/reducers/notesReducer'

import { reducer as toastr, ToastrState } from 'react-redux-toastr'
import { returntypeof } from 'react-redux-typescript'
import { INote } from 'src/app/Home/components/NoteCard/NoteCard'

export interface IStoreState {
  notes: INote[]
  toastr: ToastrState
}

const rootReducerMapping = {
  notes: notesReducer,
  toastr,
}

export default combineReducers<IStoreState>(rootReducerMapping)
