import classNames from 'classnames'
import React from 'react'

import styles from './AppBar.less'

export class AppBar extends React.PureComponent {
  render () {
    return (
      <header className={classNames(styles.appBar, 'row', 'middle-xs')}>
        <a href="/app" className={classNames(styles.logo, 'col-xs-10')}>
          Retain
        </a>
        <nav className="col-xs-2">
          <div className="row middle-xs between-xs">
            <a className={styles.link} href="/app/about">About</a>
            <span className={styles.link}>SignOut</span>
          </div>
        </nav>
      </header>
    )
  }
}
