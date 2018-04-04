// @flow
import { createAction, handleAction } from 'redux-actions'
import actionTypes from 'src/redux/actionTypes'

export interface IAuthState {
  token: string
}

export const loginAction = createAction(actionTypes.login, (email: string, password: string) => ({
  email,
  password,
}))

export const saveAuthInfoAction = createAction(actionTypes.saveAuthInfo, (token: string) => ({token}))

const defaultState: IAuthState = {
  token: null,
}

export default handleAction(actionTypes.saveAuthInfo, (_, action) => {
  return {
    token: action.payload.token,
  }
}, defaultState)
