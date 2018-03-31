import { Action } from 'flux-standard-action'
import notie from 'notie'
import { call, put, select, takeEvery } from 'redux-saga/effects'
import actionTypes from 'src/actions/actionTypes'
import { saveNotesAction } from 'src/actions/notesAction'
import { INote } from 'src/app/Home/components/NoteCard/NoteCard'
import { IStoreState } from 'src/reducers'
import { Api } from 'src/utils/api'

function* fetchNotes () {
  try {
    const response = yield call(Api.get, '/notes')
    yield put(saveNotesAction(response.data))
  } catch (error) {
    notie.alert({
      text: `Net Work goes wrong, ${error}`,
      type: 'error',
    })
  }
}

export function* fetchNotesSaga () {
  yield takeEvery(actionTypes.fetchNotes, fetchNotes)
}

export function* createNoteSaga () {
  yield takeEvery<Action<{note: INote}>>(actionTypes.createNote, function* createNote ({ payload: {note}}) {
    try {
      const response = yield call(Api.post, '/notes', note)
      const notes = yield select((state: IStoreState) => state.notes)
      yield put(saveNotesAction([...notes, response.data]))
    } catch (error) {
      notie.alert({
        text: `Net Work goes wrong, ${error}`,
        type: 'error',
      })
    }
  })
}

export function* deleteNoteSaga () {
  yield takeEvery<Action<{note: INote}>>(actionTypes.deleteNote, function* deleteNote ({payload: {note}}) {
    try {
      yield call(Api.delete, `/notes/${note.id}`)
      yield fetchNotes()
    } catch (error) {
      notie.alert({
        text: `Net Work goes wrong, ${error}`,
        type: 'error',
      })
    }
  })
}
