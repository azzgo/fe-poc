import { call, put, takeEvery } from 'redux-saga/effects'
import actionTypes from 'src/actions/actionTypes'
import { saveNotesAction } from 'src/actions/notesAction'
import { Api } from 'src/utils/api'

export function* fetchNotesSaga() {
  yield takeEvery(actionTypes.fetchNotes, function* fetchNotes() {
    try {
      const response = yield call(Api.get, '/notes')
      yield put(saveNotesAction(response.data))
    } catch {
      console.error('api call fail')
    }
  })
}
