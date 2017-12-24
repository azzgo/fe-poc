import { createStore, compose } from 'redux';
import rootReducers from 'src/reducers'

export const store =  createStore(rootReducers)
