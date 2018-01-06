import React, { PureComponent } from 'react';
import ReactDom from 'react-dom'
import { Provider } from 'react-redux'
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom'

import { store } from 'src/store';

import { MasterLayout } from 'src/shared/components/MasterLayout/MasterLayout';

import 'src/shared/styles/global.css'
import 'src/shared/styles/flexboxgrid.min.css'
import 'src/shared/styles/icons.css'

interface IProps {};

interface IState {};

class App extends PureComponent<IProps, IState> {
  public render(): JSX.Element {
    return (
      <Router>
        <React.Fragment>
          <Route path="/app" component={MasterLayout} />
          <Redirect from="/" exact to="/app" />
        </React.Fragment>
      </Router>
    );
  }
}


ReactDom.render(
(
  <Provider store={store}>
    <App /> 
  </Provider>
)
, document.getElementById('app'))
