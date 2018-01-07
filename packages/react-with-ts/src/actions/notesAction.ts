import { createAction } from 'redux-actions'
import actionTypes from 'src/actions/actionTypes'
import { INote } from 'src/app/Home/components/NoteCard/NoteCard'

export const fetchNotesAction = createAction(actionTypes.fetchNotes)

export const saveNotesAction = createAction(actionTypes.saveNotes, (notes: INote[]) => ({notes}))
