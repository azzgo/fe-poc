import { applyMiddleware, compose, createStore, combineReducers } from 'redux'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
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

const rootReducers = combineReducers<IStoreState>(rootReducerMapping)

const sagaMiddleware = createSagaMiddleware()

// tslint:disable-next-line:no-any
const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['auth'],
}

const persistedReducer = persistReducer(persistConfig, rootReducers)

export const store =  createStore(
  persistedReducer,
  composeEnhancers(applyMiddleware(
    sagaMiddleware,
  )),
)

export const persistor = persistStore(store)

sagaMiddleware.run(rootSaga)
