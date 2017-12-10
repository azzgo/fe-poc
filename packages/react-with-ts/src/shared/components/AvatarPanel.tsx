import React, { PureComponent } from 'react'
import styles from './AvatarPanel.less'

interface IProps {
  name?: string, 
  description?: string,
  avatarUrl?: string,
}

interface IState {
}

export class AvatarPanel extends PureComponent<IProps, IState> {
  render() {
    const {name, description, avatarUrl } = this.props
    return (
      <div className={styles.wrapper}>
        <div className={styles.avatar}>
          <img src={avatarUrl} alt="avatar image"/>
        </div>
        <div className={styles.profile}>
          <h1>{name}</h1>
          <p>{description}</p>
        </div>
      </div>
    )
  }
}
