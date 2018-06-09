import React, { PureComponent } from 'react'
import { match as IMatch, Route } from 'react-router'
import AboutPage from 'src/app/About/About'
import HomePage from 'src/app/Home/Home'
import { AppBar } from 'src/shared/components/AppBar/AppBar'


export class MasterLayout extends PureComponent {
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
