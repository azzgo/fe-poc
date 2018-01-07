import { all } from 'redux-saga/effects'
import { loginSaga } from 'src/sagas/authSaga'
import { createNoteSaga, deleteNoteSaga, fetchNotesSaga } from 'src/sagas/notesSaga'

export function* rootSaga () {
  yield all([
    createNoteSaga(),
    fetchNotesSaga(),
    deleteNoteSaga(),
    loginSaga(),
  ])
}
