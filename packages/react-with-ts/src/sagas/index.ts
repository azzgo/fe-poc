import { all } from 'redux-saga/effects'
import { createNoteSaga, deleteNoteSaga, fetchNotesSaga } from 'src/sagas/notesSaga'

export function* rootSaga() {
  yield all([
    createNoteSaga(),
    fetchNotesSaga(),
    deleteNoteSaga(),
  ])
}
