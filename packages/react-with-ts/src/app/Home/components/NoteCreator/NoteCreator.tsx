import classNames from 'classnames'
import React, { PureComponent } from 'react'
import styles from './NoteCreator.less'

interface IProps {}

interface IState {}

export class NoteCreator extends PureComponent<IProps, IState> {
  public render() {
    return (
      <div className={classNames(styles.noteCreator, 'shadow-2')}>
        <form className="row">
          <input
            type="text"
            name="newNoteTitle"
            placeholder="Title"
            className={classNames('col-xs-10', styles.title)}
            autoComplete="off"
          />
          <input
            type="text"
            name="newNoteValue"
            placeholder="Take a note..."
            className="col-xs-10"
            autoComplete="off"
          />
          <div className="actions col-xs-12 row between-xs">
            <button type="submit" className="btn-light">
              Done
            </button>
          </div>
        </form>
      </div>
    )
  }
}
