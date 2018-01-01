import React, { PureComponent } from 'react';
import ReactDom from 'react-dom'
import { Provider } from 'react-redux'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import { store } from 'src/store';
import { HomePage } from 'src/app/Home';
import { GenericPage } from 'src/app/Generic';

import 'src/shared/styles/libs/css/font-awesome.min.css'
import 'src/shared/styles/global.css'
import { ElementsPage } from 'src/app/Elements';

interface IProps {};

interface IState {};

class App extends PureComponent<IProps, IState> {
  public render(): JSX.Element {
    return (
      <Router>
        <React.Fragment>
          <Route path="/" exact component={HomePage} />
          <Route path="/generic" component={GenericPage} />
          <Route path="/elements" component={ElementsPage} />
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
