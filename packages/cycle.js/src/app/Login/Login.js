import { html } from 'snabbdom-jsx'
import classNames from 'classnames'
import xs from 'xstream'

import styles from './Login.less'
function intent(source) {
  let emailValue = ''
  let passwordValue = ''

  const emailInputEmiter$ = source.DOM.select('#email')
    .events('input')
  const passwordInputEmiter$ = source.DOM.select('#password')
    .events('input')

  const loginEmiter$ = source.DOM.select('#login-button')
    .events('click')

  const emailValue$ = emailInputEmiter$
    .map((e) => {
      emailValue = e.target.value
      return emailValue
    })
    .startWith('')

  const passwordValue$ = passwordInputEmiter$
    .map((e) => {
      passwordValue = e.target.value
      return passwordValue
    })
    .startWith('')

  const isEmailDirty$ = emailInputEmiter$.mapTo(true).startWith(false)
  const isPasswordDirty$ = passwordInputEmiter$.mapTo(true).startWith(false)

  return {
    request$: loginEmiter$
      .map((event) => event.preventDefault())
      .map(() => {
        if (emailValue.length === 0 || passwordValue.length === 0) {
          return xs.empty()
        }
        
        return {
          url: 'http://127.0.0.1:3000/auth',
          category: 'login',
          send: {
            email: emailValue,
            password: passwordValue
          }
        }
      }),
    router$: source.HTTP.select('login')
      .flatten()
      .map((res) => localStorage.token = res.body.token)
      .mapTo('/'),
    state$: xs.combine(emailValue$, passwordValue$, isEmailDirty$, isPasswordDirty$)
      .map(([email, password, isEmailDirty, isPasswordDirty]) => ({
        email,
        password,
        isEmailDirty,
        isPasswordDirty
      }))
  }
}

function view(state$) {
  return state$.map(({ email, password, isEmailDirty, isPasswordDirty }) => {
    return (
      <div className={classNames(styles.auth, 'row center-xs middle-xs')}>
        <form className="col-xs-6 shadow-2">
          <div className={classNames(styles.inputs, 'row center-xs middle-xs')}>
            <h3 className={classNames(styles.title, 'col-xs-8')}>Sign In</h3>
            <input
              className="col-xs-8"
              id="email"
              type="email"
              name="email"
              placeholder="email"
              required
            />
            {
              isEmailDirty && email.length === 0 
                ? (
                  <div className={styles.error}>email is invalid</div>
                ) 
                : ''
            }
            <input
              className="col-xs-8"
              id="password"
              type="password"
              name="password"
              placeholder="password"
              required
            />
            {
              isPasswordDirty && password.length === 0 
                ? (
                  <div className={styles.error}>password is required</div>
                )
                : ''
            }
            <div className="col-xs-12">
              <div className="row center-xs">
                <button id="login-button" className="btn-light" type="submit">
                  Login
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    )
  })
}

export function Login(source) {
  const { request$, router$, state$ } = intent(source)
  const vdom$ = view(state$)

  return {
    DOM: vdom$,
    router: router$,
    HTTP: request$
  }
}
