import { handleAction } from 'redux-actions'
import actionTypes from 'src/actions/actionTypes'
import { INote } from 'src/app/Home/components/NoteCard/NoteCard'

type INoteState = INote[]

export default handleAction<INoteState, any>(
  actionTypes.saveNotes,
  (state, action) => {
    return action.payload.notes
  },
  [],
)
