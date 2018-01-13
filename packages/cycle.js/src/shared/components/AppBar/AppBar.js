import classNames from 'classnames'
import styles from './AppBar.less'
import { html } from 'snabbdom-jsx'

export function AppBar() {
  return (
    <header className={classNames(styles.appBar, 'row', 'middle-xs')}>
      <a href="/" className={classNames(styles.logo, 'col-xs-10')}>
          Retain
      </a>
      <nav className="col-xs-2">
        <div className="row middle-xs between-xs">
          <a className={styles.link} href="/about">About</a>
          <span className={styles.link}>SignOut</span>
        </div>
      </nav>
    </header>
  )
}