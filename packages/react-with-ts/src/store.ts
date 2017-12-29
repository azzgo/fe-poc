import { createStore, compose } from 'redux';
import rootReducers from 'src/reducers'

export const store =  createStore(
  rootReducers,
  (window as any).__REDUX_DEVTOOLS_EXTENSION__ && (window as any).__REDUX_DEVTOOLS_EXTENSION__(),
)
