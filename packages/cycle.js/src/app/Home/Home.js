import xs from 'xstream'
import { html } from 'snabbdom-jsx'
import { AppBar } from '../../shared/components/AppBar/AppBar'
import classNames from 'classnames'
import styles from './Home.less'
import { NoteCreator } from './components/NoteCreator/NoteCreator'
import { NoteCard } from './components/NoteCard/NoteCard'

function view(state$) {
  const appBar = AppBar()
  const noteCreator = NoteCreator()

  return xs.combine(state$, appBar.DOM, noteCreator.DOM).map(([notes, appBarDOM, noteCreatorDOM]) => (
    <div>
      {appBarDOM}
      <div className={classNames(styles.warpper, 'row center-xs')}>
        <div className={classNames(styles.creator, 'col-xs-6')}>
          {noteCreatorDOM}
        </div>
        <div className="notes col-xs-8">
          <div className="row between-xs">
            {
              notes.map((note) => {
                return NoteCard({ note, className: 'col-xs-4' })
              })
            }
          </div>
        </div>
      </div>
    </div>
  ))
}

export function Home(source) {
  const state$ = xs.of([
    {
      title: 'Note1 title',
      value: 'Note1 value',
    },
    {
      title: 'Note2 title',
      value: 'Note2 value',
    },
    {
      title: 'Note3 title',
      value: 'Note3 value',
    }
  ])

  const vdom$ = view(state$)

  return {
    DOM: vdom$,
  }
}