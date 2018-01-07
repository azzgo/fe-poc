import { applyMiddleware, compose, createStore } from 'redux'
import createSagaMiddleware from 'redux-saga'
import rootReducers from 'src/reducers'
import { rootSaga } from 'src/sagas'

const sagaMiddleware = createSagaMiddleware()

// tslint:disable-next-line:no-any
const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

export const store =  createStore(
  rootReducers,
  composeEnhancers(applyMiddleware(
    sagaMiddleware,
  )),
)

sagaMiddleware.run(rootSaga)
