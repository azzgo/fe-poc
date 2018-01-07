import classNames from 'classnames'
import React, { PureComponent } from 'react'

import styles from './NoteCard.less'

export interface INote {
  id?: string,
  title: string
  value: string
}

interface IProps {
  className?: string
  note: INote
  onChecked: (_: INote) => void
}

interface IState {}

export class NoteCard extends PureComponent<IProps, IState> {
  public render () {
    const { note, className } = this.props

    return (
      <div className={classNames('row shadow-1', styles.noteCard, className)}>
        <div className={styles.icon} onClick={this.onChecked}>
          <i className="material-icons">check</i>
        </div>
        <div className={classNames('col-xs-12', styles.title)}>{note.title}</div>
        <div className={classNames('col-xs-12', styles.value)}>{note.value}</div>
      </div>
    )
  }

  private onChecked = () => {
    this.props.onChecked(this.props.note)
  }
}
