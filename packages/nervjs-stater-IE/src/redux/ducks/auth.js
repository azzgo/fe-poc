import { createAction, handleAction } from 'redux-actions'
import actionTypes from 'src/redux/actionTypes'


export const loginAction = createAction(actionTypes.login, (email, password) => ({
  email,
  password,
}))

export const saveAuthInfoAction = createAction(actionTypes.saveAuthInfo, (token) => ({token}))

const defaultState = {
  token: null,
}

export default handleAction(actionTypes.saveAuthInfo, (_, action) => {
  return {
    token: action.payload.token,
  }
}, defaultState)
