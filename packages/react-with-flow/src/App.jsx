// @flow
import notie from 'notie'
import React, { PureComponent, Fragment } from 'react'
import ReactDom from 'react-dom'
import { Provider } from 'react-redux'
import { BrowserRouter as Router, Redirect, Route } from 'react-router-dom'

import { store } from 'src/redux/store'

import { MasterLayout } from 'src/shared/components/MasterLayout/MasterLayout'

import LoginPage from 'src/app/Login/Login'
import 'src/shared/styles/flexboxgrid.min.css'
import 'src/shared/styles/global.css'
import 'src/shared/styles/icons.css'

notie.setOptions({
  alertTime: 2,
})

class App extends PureComponent<{}> {

  render () {
    return (
      <Router>
        <Fragment>
          <Route path="/login" component={LoginPage} />
          <Route path="/app" component={MasterLayout} />
          <Route path="/" exact render={() => <Redirect to="/app" />} />
        </Fragment>
      </Router>
    )
  }
}

ReactDom.render(
  <Provider store={store}>
    <App />
  </Provider>,
  (document.getElementById('app'): any),
)
