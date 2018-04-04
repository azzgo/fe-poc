// @flow
import { createAction, handleAction } from 'redux-actions'
import actionTypes from 'src/redux/actionTypes'
import { INote } from 'src/app/Home/components/NoteCard/NoteCard'

export const fetchNotesAction = createAction(actionTypes.fetchNotes)

export const saveNotesAction = createAction(actionTypes.saveNotes, (notes: INote[]) => ({notes}))

export const createNoteAction = createAction(actionTypes.createNote, (note: INote) => ({note}))

export const deleteNoteAction = createAction(actionTypes.deleteNote, (note: INote) => ({note}))

export type INoteState = INote[]

export default handleAction(
  actionTypes.saveNotes,
  (_, action) => {
    return action.payload.notes
  },
  [],
)
