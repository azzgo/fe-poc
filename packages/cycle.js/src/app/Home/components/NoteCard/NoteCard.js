
import classNames from 'classnames'
import styles from './NoteCard.less'
import { html } from 'snabbdom-jsx'
import xs from 'xstream'
import { actionTypes } from '../../constants'


export function NoteCard({DOM, props: {note, className}}) {
  return {
    DOM: xs.of(
      <div className={classNames('row shadow-1', styles.noteCard, className)}>
        <div className={styles.icon}>
          <i className="material-icons">check</i>
        </div>
        <div className={classNames('col-xs-12', styles.title)}>{note.title}</div>
        <div className={classNames('col-xs-12', styles.value)}>{note.value}</div>
      </div>
    ),
    HTTP: DOM.select(`.${styles.icon}`)
      .events('click')
      .mapTo({
        url: `http://127.0.0.1:3000/notes/${note.id}`,
        headers: {
          Authorization: `Bearer ${localStorage.token}`
        },
        method: 'DELETE',
        category: actionTypes.deleteNote,
      })
  }
}
