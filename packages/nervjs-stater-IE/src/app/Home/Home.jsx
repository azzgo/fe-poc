import React, { PureComponent } from 'react'
import { connect } from 'react-redux'

import classNames from 'classnames'

import { INote, NoteCard } from 'src/app/Home/components/NoteCard/NoteCard'
import NoteCreator from 'src/app/Home/containers/NoteCreator/NoteCreator'
import { deleteNoteAction, fetchNotesAction } from 'src/redux/ducks/notes'
import styles from './Home.less'

export class HomePage extends PureComponent {
  componentWillMount () {
    this.props.fetchNotes()
  }

  render () {
    return (
      <div className={classNames(styles.warpper, 'row center-xs')}>
        <div className={classNames(styles.creator, 'col-xs-6')}>
          <NoteCreator />
        </div>
        <div className="notes col-xs-8">
          <div className="row between-xs">
            {this.renderNoteCard()}
          </div>
        </div>
      </div>
    )
  }

  renderNoteCard = () => {
    return this.props.notes.map((note) => (
      <NoteCard key={note.id} className="col-xs-4" note={note} onChecked={this.onCheckCard} />
    ))
  }

  onCheckCard = (note) => {
    this.props.deleteNote(note)
  }
}

const mapStateToProps = (state) => ({
  notes: state.notes,
})

const mapDispatchToProps = {
  deleteNote: deleteNoteAction,
  fetchNotes: fetchNotesAction,
}

export default connect(mapStateToProps, mapDispatchToProps)(HomePage)
