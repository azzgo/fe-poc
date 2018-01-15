
import classNames from 'classnames'
import styles from './NoteCard.less'
import { html } from 'snabbdom-jsx'

export function NoteCard({note, className}) {
  return(
    <div className={classNames('row shadow-1', styles.noteCard, className)}>
      <div className={styles.icon}>
        <i className="material-icons">check</i>
      </div>
      <div className={classNames('col-xs-12', styles.title)}>{note.title}</div>
      <div className={classNames('col-xs-12', styles.value)}>{note.value}</div>
    </div>
  )
}
