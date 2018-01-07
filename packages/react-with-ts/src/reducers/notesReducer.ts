import { handleAction } from 'redux-actions'
import actionTypes from 'src/actions/actionTypes'
import { INote } from 'src/app/Home/components/NoteCard/NoteCard'

export type INoteState = INote[]

export default handleAction<INoteState, {notes: INote[]}>(
  actionTypes.saveNotes,
  (_, action) => {
    return action.payload.notes
  },
  [],
)
