import notie from 'notie'
import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { BrowserRouter as Router, Redirect, Route } from 'react-router-dom'

import { MasterLayout } from 'src/shared/components/MasterLayout/MasterLayout'

import LoginPage from 'src/app/Login/Login'
import 'src/shared/styles/flexboxgrid.min.css'
import 'src/shared/styles/global.css'
import 'src/shared/styles/icons.css'
import { Api } from 'src/utils/api'
import { IStoreState } from 'src/redux/store'

notie.setOptions({
  alertTime: 2,
})

interface IOwnProps {}

interface IState {}

const mapStateToProps = (state: IStoreState) => ({
  token: state.auth.token,
})

type IStateType = ReturnType<typeof mapStateToProps>

type IProps = IOwnProps & IStateType

class App extends PureComponent<IProps, IState> {
  componentDidMount () {
    Api.defaults.headers.Authorization = `Bearer ${this.props.token}`
  }

  render (): JSX.Element {
    return (
      <Router>
        <React.Fragment>
          <Route path="/login" component={LoginPage} />
          <Route path="/app" component={MasterLayout} />
          <Route path="/" exact render={this.renderRedirect} />
        </React.Fragment>
      </Router>
    )
  }

  renderRedirect = () => {
    return <Redirect to="/app" />
  }
}

export default connect(mapStateToProps)(App)
