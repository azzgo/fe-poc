import xs from 'xstream'
import { html } from 'snabbdom-jsx'
import { AppBar } from '../../shared/components/AppBar/AppBar'
import classNames from 'classnames'
import styles from './Home.less'
import { NoteCreator } from './components/NoteCreator/NoteCreator'
import { NoteCard } from './components/NoteCard/NoteCard'
import { actionTypes } from './constants'
import sampleCombine from 'xstream/extra/sampleCombine'
import isolate from  '@cycle/isolate'

function intent(source) {
  const allNotes$ = source.HTTP.select(actionTypes.fetchNotes)
    .flatten()
    .map((res) => res.body)
  
  const newNote$ = source.HTTP.select(actionTypes.createNote)
    .flatten()
    .map((res) => res.body)
  
  const deleteNote$ = source.HTTP.select(actionTypes.deleteNote).flatten()

  return xs.merge(
    allNotes$.map((notes) => ({ type: actionTypes.fetchNotes, payload: notes })),
    newNote$.map((newNote) => ({ type: actionTypes.createNote, payload: newNote})),
    deleteNote$.map(() => ({ type: actionTypes.deleteNote }))
  ).startWith({type: undefined})
}

function modal(notesActions$) {
  let state = {
    notes: []
  }

  return notesActions$.map((action) => {
    switch(action.type) {
    case actionTypes.fetchNotes:
      state = {
        notes: action.payload
      }
      break
    case actionTypes.createNote:
      state = {
        notes: state.notes.concat([action.payload])
      }
      break
    }

    return state
  })
}


function view(DOMSink, state$) {

  const appBar = AppBar()
  const noteCreator = NoteCreator({DOM: DOMSink})

  const noteCards$ = state$
    .map(({notes}) => {
      return notes.map((note) => {
        return isolate(NoteCard, note.id)({ DOM: DOMSink, props: { note, className: 'col-xs-4' }})
      })
    })

  return {
    vdom$: noteCards$
      .map((noteCards) => xs.combine(...noteCards.map((noteCard) => noteCard.DOM)))
      .flatten()
      .compose(sampleCombine(appBar.DOM, noteCreator.DOM))
      .map(([NoteCardViews, AppBarView, NoteCreatorView]) => (
        <div>
          {AppBarView}
          <div className={classNames(styles.warpper, 'row center-xs')}>
            <div className={classNames(styles.creator, 'col-xs-6')}>
              {NoteCreatorView}
            </div>
            <div className="notes col-xs-8">
              <div className="row between-xs">
                {NoteCardViews}
              </div>
            </div>
          </div>
        </div>
      )),
    request$: xs.merge(
      noteCreator.HTTP,
      noteCards$.map((noteCards) => xs.merge(...noteCards.map((noteCard) => noteCard.HTTP))).flatten()
    )
  }
}

export function Home(source) {
  const fetchNotes$ = xs.merge(
    xs.of({
      url: 'http://127.0.0.1:3000/notes',
      category: actionTypes.fetchNotes,
    }),
    source.HTTP.select(actionTypes.deleteNote)
      .flatten()
      .mapTo({
        url: 'http://127.0.0.1:3000/notes',
        category: actionTypes.fetchNotes,
      })
  )

  const actions$ = intent(source)
  const state$ = modal(actions$)
  const { vdom$, request$ } = view(source.DOM, state$)

  return {
    DOM: vdom$,
    HTTP: xs.merge(request$, fetchNotes$),
  }
}