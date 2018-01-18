import classNames from 'classnames'
import { html } from 'snabbdom-jsx'
import xs from 'xstream'
import sampleCombine from 'xstream/extra/sampleCombine'

import styles from './NoteCreator.less'
import { actionTypes } from '../../constants'

export function NoteCreator({DOM}) {
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
    HTTP: DOM.select('#new-note-submit').events('click').map((e) => e.preventDefault())
      .compose(sampleCombine(
        DOM.select('#new-note-title').element(),
        DOM.select('#new-note-value').element()
      ))
      .map(([,titleEl, valueEl]) => {
        const title = titleEl.value
        const value = valueEl.value

        if (!title || !value) {
          return xs.empty()
        }

        // reset 
        titleEl.value = ''
        valueEl.value = ''

        return {
          url: 'http://127.0.0.1:3000/notes',
          method: 'POST',
          category: actionTypes.createNote,
          send: {
            title,
            value,
          }
        }
      })
  }
}
