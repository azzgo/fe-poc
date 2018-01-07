import { handleAction } from 'redux-actions'
import actionTypes from 'src/actions/actionTypes'

export interface IAuthState {
  token: string
}

const defaultState: IAuthState = {
  token: null,
}

export default handleAction<IAuthState, { token: string }>(actionTypes.saveAuthInfo, (_, action) => {
  return {
    token: action.payload.token,
  }
}, defaultState)
