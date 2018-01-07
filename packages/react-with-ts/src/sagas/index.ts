import { all } from 'redux-saga/effects'
import { fetchNotesSaga } from 'src/sagas/notesSaga'

export function* rootSaga() {
  yield all([
    fetchNotesSaga(),
  ])
}
