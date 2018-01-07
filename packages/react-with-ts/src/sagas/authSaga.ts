import { Action } from 'flux-standard-action'
import { toastr } from 'react-redux-toastr'
import { call, put, takeLatest } from 'redux-saga/effects'
import actionTypes from 'src/actions/actionTypes'
import { saveAuthInfoAction } from 'src/actions/authActions'
import { Api } from 'src/utils/api'

export function* loginSaga () {
  yield takeLatest<Action<{ email: string; password: string }>>(actionTypes.login, function* login ({
    payload: { email, password },
  }) {
    try {
      const {data: { token }} = yield call(Api.post, '/auth', { email, password })
      Api.defaults.headers.Authorization = `Bearer ${token}`
      yield put(saveAuthInfoAction(token))
    } catch (error) {
      toastr.error('Net Work goes wrong', error)
    }
  })
}
