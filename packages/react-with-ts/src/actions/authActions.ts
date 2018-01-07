
import { createAction } from 'redux-actions'
import actionTypes from 'src/actions/actionTypes'

export const loginAction = createAction(actionTypes.login, (email: string, password: string) => ({
  email,
  password,
}))

export const saveAuthInfoAction = createAction(actionTypes.saveAuthInfo, (token: string) => ({token}))
