import classNames from 'classnames'
import { html } from 'snabbdom-jsx'
import xs from 'xstream'

import styles from './NoteCreator.less'


export function NoteCreator(source) {
  return {
    DOM: source.props$.map((props) => (
      <div className={classNames(styles.noteCreator, 'shadow-2')}>
        <form className="row">
          <input
            type="text"
            id="new-note-title"
            name="newNoteTitle"
            placeholder="Title"
            value={props.newNote.title}
            className={classNames('col-xs-10', styles.title)}
            autoComplete="off"
          />
          <input
            type="text"
            id="new-note-value"
            name="newNoteValue"
            placeholder="Take a note..."
            value={props.newNote.value}
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
    )),
    HTTP: source.DOM.select('#new-note-submit').events('click').map((event) => {
      event.preventDefault()
      return source.props$.map((props) => ({
        url: 'http://127.0.0.1:3000/notes',
        method: 'POST',
        send: props.newNote,
      }))
    }),
    value: xs.combine(
      source.DOM.select('#new-note-title').map((e) => e.target.value),
      source.DOM.select('#new-note-value').map((e) => e.target.value)
    )
  }
}
