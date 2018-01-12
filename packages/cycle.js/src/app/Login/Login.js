import { html } from 'snabbdom-jsx'
import classNames from 'classnames'

import styles from './Login.less'

function intent(source) {
  return source.DOM.select('button')
    .events('click')
    .map((event) => {
      event.stopPropagation()
      return '/'
    })
}

function view() {
  return (
    <div className={classNames(styles.auth, 'row center-xs middle-xs')}>
      <form className="col-xs-6 shadow-2">
        <div className={classNames(styles.inputs, 'row center-xs middle-xs')}>
          <h3 className={classNames(styles.title, 'col-xs-8')}>Sign In</h3>
          <input
            className="col-xs-8"
            type="email"
            name="email"
            placeholder="email"
            required
          />
          <input
            className="col-xs-8"
            type="password"
            name="password"
            placeholder="password"
            required
          />
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

export function Login(source) {
  const router$ = intent(source)
  const vdom$ = view()

  return {
    DOM: vdom$,
    router: router$
  }
}
