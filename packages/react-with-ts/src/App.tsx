import React, { PureComponent } from 'react';
import ReactDom from 'react-dom'
import { Provider } from 'react-redux'
import { store } from 'src/store';

interface IProps {};

interface IState {};

class App extends PureComponent<IProps, IState> {
  public render(): JSX.Element {
    return (
      <Provider store={store}>
        <span>App</span>
      </Provider>
    );
  }
}


ReactDom.render(<App /> , document.getElementById('app'))
