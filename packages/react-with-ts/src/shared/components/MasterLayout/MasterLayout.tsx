import React, { PureComponent } from 'react'
import { Route } from 'react-router'
import { HomePage } from 'src/app/Home/Home'
import { AppBar } from 'src/shared/components/AppBar/AppBar'

interface IProps {
  children: JSX.Element | JSX.Element[]
}

interface IState {}

export class MasterLayout extends PureComponent<IProps, IState> {
  public render() {
    return (
      <div>
        <AppBar />
        <Route path="" exact component={HomePage} />
      </div>
    )
  }
}
