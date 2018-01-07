import { combineReducers } from 'redux'
import notesReducer from 'src/reducers/notesReducer'

export default combineReducers({
  notes: notesReducer,
})
