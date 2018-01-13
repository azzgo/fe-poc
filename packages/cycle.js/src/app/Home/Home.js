import xs from 'xstream'
import { html } from 'snabbdom-jsx'
import { AppBar } from '../../shared/components/AppBar/AppBar'
import classNames from 'classnames'
import styles from './Home.less'
import { NoteCreator } from './components/NoteCreator/NoteCreator'

function view() {
  // const noteCreator = NoteCreator() 
  // const NoteCreatorDom = noteCreator.DOM

  return xs.of(
    <div>
      <AppBar />
      <div className={classNames(styles.warpper, 'row center-xs')}>
        <div className={classNames(styles.creator, 'col-xs-6')}>
        </div>
        <div className="notes col-xs-8">
          <div className="row between-xs">
            {/* this.renderNoteCard() */}
          </div>
        </div>
      </div>
    </div>
  )
}

export function Home() {
  const vdom$ = view()

  return {
    DOM: vdom$,
  }
}