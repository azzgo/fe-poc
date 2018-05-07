import classNames from 'classnames'
import { History } from 'history'
import React, { FormEvent, PureComponent, SyntheticEvent } from 'react'
import { connect } from 'react-redux'
import styles from './Login.less'
import { IStoreState } from 'src/redux/store'
import { loginAction } from 'src/redux/ducks/auth'

interface IState {
  email: string
  isEmailDirty: boolean
  isPasswordirty: boolean
  password: string
}

interface IOwnProps {
  history: History
}

const mapStateToProps = (state: IStoreState) => ({
  token: state.auth.token,
})

type IStateToProps = ReturnType<typeof mapStateToProps>

const mapDispatchToProps = {
  login: loginAction,
}

type IDispatchToProps = typeof mapDispatchToProps

type IProps = IStateToProps & IDispatchToProps & IOwnProps

export class LoginPage extends PureComponent<IProps, IState> {
  public state = {
    email: '',
    isEmailDirty: false,
    isPasswordirty: false,
    password: '',
  }

  public componentWillUpdate (nextProps: IProps) {
    if (nextProps.token !== this.props.token && nextProps.token) {
      this.props.history.push('/app')
    }
  }

  public render () {
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

  public updateEmail = (event: SyntheticEvent<HTMLInputElement>) =>
    this.setState({ email: event.currentTarget.value, isEmailDirty: true })
  public updatePassword = (event: SyntheticEvent<HTMLInputElement>) =>
    this.setState({ password: event.currentTarget.value, isPasswordirty: true })

  public submit = (event: FormEvent<{}>) => {
    event.preventDefault()

    const { email, password } = this.state

    if (email.length > 0 && password.length > 0) {
      this.props.login(email, password)
    }

    return
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage)
