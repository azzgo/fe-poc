import { createAction, handleAction } from 'redux-actions'
import actionTypes from 'src/redux/actionTypes'
import { Api } from 'src/utils/api'

export const fetchNotesAction = () => async (dispatch) => {
  const response = await Api.get('/notes')
  console.log('res', response)
  dispatch(saveNotesAction(response.data))
}

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
