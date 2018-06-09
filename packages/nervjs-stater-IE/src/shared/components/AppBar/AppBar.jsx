import classNames from 'classnames'
import React, { PureComponent } from 'react'
import { Link } from 'react-router-dom'

import styles from './AppBar.less'

export class AppBar extends PureComponent {
  render () {
    return (
      <header className={classNames(styles.appBar, 'row', 'middle-xs')}>
        <Link to="/app" className={classNames(styles.logo, 'col-xs-10')}>
          Retain
        </Link>
        <nav className="col-xs-2">
          <div className="row middle-xs between-xs">
            <Link className={styles.link} to="/app/about">About</Link>
            <span className={styles.link}>SignOut</span>
          </div>
        </nav>
      </header>
    )
  }
}
