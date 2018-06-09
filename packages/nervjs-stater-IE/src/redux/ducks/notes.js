import { createAction, handleAction } from 'redux-actions'
import actionTypes from 'src/redux/actionTypes'

export const fetchNotesAction = createAction(actionTypes.fetchNotes)

export const saveNotesAction = createAction(actionTypes.saveNotes, (notes) => ({notes}))

export const createNoteAction = createAction(actionTypes.createNote, (note) => ({note}))

export const deleteNoteAction = createAction(actionTypes.deleteNote, (note) => ({note}))


export default handleAction(
  actionTypes.saveNotes,
  (_, action) => {
    return action.payload.notes
  },
  [],
)
