
import React from 'react'
import { PersistGate } from 'redux-persist/integration/react'
import ReactDOM from 'react-dom'

import { store, persistor } from 'src/redux/store'
import { Provider } from 'react-redux'
import App from 'src/App'

ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>,
  document.getElementById('app'),
)
