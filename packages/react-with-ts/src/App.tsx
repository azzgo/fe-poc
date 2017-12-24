import React, { PureComponent } from 'react';
import ReactDom from 'react-dom'
import { Provider } from 'react-redux'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import { store } from 'src/store';
import { HomePage } from 'src/app/Home';
import { AboutPage } from 'src/app/About';

interface IProps {};

interface IState {};

class App extends PureComponent<IProps, IState> {
  public render(): JSX.Element {
    return (
      <Router>
        <React.Fragment>
          <Route path="/" exact component={HomePage} />
          <Route path="/about" component={AboutPage} />
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
