import React, { PureComponent } from 'react';
import ReactDom from 'react-dom'

interface IProps {};

interface IState {};

class App extends PureComponent<IProps, IState> {
  public render(): JSX.Element {
    return (<span>App</span>);
  }
}


ReactDom.render(<App /> , document.getElementById('app'))
