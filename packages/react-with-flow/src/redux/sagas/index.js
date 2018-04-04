// @flow
import { all } from 'redux-saga/effects'
import { loginSaga } from './authSaga'
import { createNoteSaga, deleteNoteSaga, fetchNotesSaga } from './notesSaga'

export function* rootSaga () {
  yield all([
    createNoteSaga(),
    fetchNotesSaga(),
    deleteNoteSaga(),
    loginSaga(),
  ])
}
