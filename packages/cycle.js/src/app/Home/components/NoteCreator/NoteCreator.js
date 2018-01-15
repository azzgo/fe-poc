import classNames from 'classnames'
import { html } from 'snabbdom-jsx'
import xs from 'xstream'

import styles from './NoteCreator.less'

export function NoteCreator(source) {
  return {
    DOM: xs.of(
      <div className={classNames(styles.noteCreator, 'shadow-2')}>
        <form className="row">
          <input
            type="text"
            id="new-note-title"
            name="newNoteTitle"
            placeholder="Title"
            className={classNames('col-xs-10', styles.title)}
            autoComplete="off"
          />
          <input
            type="text"
            id="new-note-value"
            name="newNoteValue"
            placeholder="Take a note..."
            className="col-xs-10"
            autoComplete="off"
          />
          <div className="actions col-xs-12 row between-xs">
            <button id="new-note-submit" type="submit" className="btn-light">
              Done
            </button>
          </div>
        </form>
      </div>
    ),
  }
}
