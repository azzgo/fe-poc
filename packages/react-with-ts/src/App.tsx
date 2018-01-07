import React, { PureComponent } from 'react'
import ReactDom from 'react-dom'
import { Provider } from 'react-redux'
import ReduxToastr from 'react-redux-toastr'
import { BrowserRouter as Router, Redirect, Route } from 'react-router-dom'

import { store } from 'src/store'

import { MasterLayout } from 'src/shared/components/MasterLayout/MasterLayout'

import LoginPage from 'src/app/Login/Login'
import 'src/shared/styles/flexboxgrid.min.css'
import 'src/shared/styles/global.css'
import 'src/shared/styles/icons.css'

interface IProps {}

interface IState {}

class App extends PureComponent<IProps, IState> {
  public render (): JSX.Element {
    return (
      <Router>
        <React.Fragment>
          <Route path="/login" component={LoginPage} />
          <Route path="/app" component={MasterLayout} />
          <Route path="/" exact render={this.renderRedirect} />
          <ReduxToastr
            timeOut={3000}
            newestOnTop={false}
            preventDuplicates
            position="top-right"
            transitionIn="fadeIn"
            transitionOut="fadeOut"
          />
        </React.Fragment>
      </Router>
    )
  }

  public renderRedirect = () => {
    return <Redirect to="/app" />
  }
}

ReactDom.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('app'),
)
