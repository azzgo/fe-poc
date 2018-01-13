
import classNames from 'classnames'
import styles from './NoteCard.less'

export function NoteCard(source) {
  return {
    DOM: source.props$.map((props) => {
      const { className, note } = props
      return (
        <div className={classNames('row shadow-1', styles.noteCard, className)}>
          <div className={styles.icon}>
            <i className="material-icons">check</i>
          </div>
          <div className={classNames('col-xs-12', styles.title)}>{note.title}</div>
          <div className={classNames('col-xs-12', styles.value)}>{note.value}</div>
        </div>
      )
    }),
    HTTP: source.props$.map((props) => {
      return {
        url: `http://127.0.0.1:3000/notes/${props.note.id}`,
        method: 'DELETE',
      }
    }),
    checkEvent: source.DOM.select(styles.icon).events('click')
  }
}
