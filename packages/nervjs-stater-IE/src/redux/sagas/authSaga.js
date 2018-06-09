import notie from 'notie'
import { call, put, takeLatest } from 'redux-saga/effects'
import actionTypes from 'src/redux/actionTypes'
import { saveAuthInfoAction } from 'src/redux/ducks/auth'
import { Api } from 'src/utils/api'

export function* loginSaga () {
  yield takeLatest(actionTypes.login, function* login ({
    payload: { email, password },
  }) {
    try {
      const {data: { token }} = yield call(Api.post, '/auth', { email, password })
      Api.defaults.headers.Authorization = `Bearer ${token}`
      yield put(saveAuthInfoAction(token))
    } catch (error) {
      notie.alert({
        text: `'Net Work goes wrong', ${error}`,
        type: 'error',
      })
    }
  })
}
