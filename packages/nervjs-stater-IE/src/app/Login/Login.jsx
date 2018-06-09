import classNames from 'classnames'
import { History } from 'history'
import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { loginAction } from 'src/redux/ducks/auth'
import styles from './Login.less'

const mapStateToProps = (state) => ({
  token: state.auth.token,
})
const mapDispatchToProps = {
  login: loginAction,
}


export class LoginPage extends PureComponent {
  state = {
    email: '',
    isEmailDirty: false,
    isPasswordirty: false,
    password: '',
  }

  componentWillUpdate (nextProps) {
    if (nextProps.token !== this.props.token && nextProps.token) {
      this.props.history.push('/app')
    }
  }

  updateEmail = (event) =>
    this.setState({ email: event.currentTarget.value, isEmailDirty: true })

  updatePassword = (event) =>
    this.setState({ password: event.currentTarget.value, isPasswordirty: true })

  submit = (event) => {
    event.preventDefault()

    const { email, password } = this.state

    if (email.length > 0 && password.length > 0) {
      this.props.login(email, password)
    }

    return
  }

  render () {
    const { email, password, isEmailDirty, isPasswordirty } = this.state

    return (
      <div className={classNames(styles.auth, 'row center-xs middle-xs')}>
        <form className="col-xs-6 shadow-2" onSubmit={this.submit}>
          <div className={classNames(styles.inputs, 'row center-xs middle-xs')}>
            <h3 className={classNames(styles.title, 'col-xs-8')}>Sign In</h3>
            <input
              className="col-xs-8"
              type="email"
              name="email"
              placeholder="email"
              onChange={this.updateEmail}
              value={email}
              required
            />
            {isEmailDirty && email.length === 0 &&  <div className={styles.error}>email is invalid</div>}
            <input
              className="col-xs-8"
              type="password"
              name="password"
              placeholder="password"
              value={password}
              onChange={this.updatePassword}
              required
            />
            {isPasswordirty && password.length === 0 && <div className={styles.error}>password is required</div>}
            <div className="col-xs-12">
              <div className="row center-xs">
                <button className="btn-light" type="submit">
                  Login
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage)
