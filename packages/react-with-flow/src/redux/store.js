// @flow
import { applyMiddleware, compose, createStore, combineReducers } from 'redux'
import createSagaMiddleware from 'redux-saga'
import { rootSaga } from 'src/redux/sagas'
import auth from 'src/redux/ducks/auth'
import notes, { INoteState } from 'src/redux/ducks/notes'
import { IAuthState } from 'src/redux/ducks/auth'

export interface IStoreState {
  auth: IAuthState,
  notes: INoteState
}

const rootReducerMapping = {
  auth,
  notes,
}

const rootReducers = combineReducers(rootReducerMapping)

const sagaMiddleware = createSagaMiddleware()

// tslint:disable-next-line:no-any
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

export const store =  createStore(
  rootReducers,
  composeEnhancers(applyMiddleware(
    sagaMiddleware,
  )),
)

sagaMiddleware.run(rootSaga)
