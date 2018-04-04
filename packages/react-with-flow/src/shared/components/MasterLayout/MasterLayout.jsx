// @flow
import React, { PureComponent } from 'react'
import { match as IMatch, Route } from 'react-router'
import AboutPage from 'src/app/About/About'
import HomePage from 'src/app/Home/Home'
import { AppBar } from 'src/shared/components/AppBar/AppBar'

interface IProps {
  match: IMatch<{}>
}

interface IState {}

export class MasterLayout extends PureComponent<IProps, IState> {
  render () {
    const { match } = this.props
    return (
      <div>
        <AppBar />
        <Route path={match.url} exact component={HomePage} />
        <Route path={match.url + '/about'} component={AboutPage} />
      </div>
    )
  }
}
