import React, { PureComponent } from 'react'
import { connect } from 'react-redux'

import classNames from 'classnames'

import { INote, NoteCard } from 'src/app/Home/components/NoteCard/NoteCard'
import NoteCreator from 'src/app/Home/containers/NoteCreator/NoteCreator'
import styles from './Home.less'
import { IStoreState } from 'src/redux/store'
import { deleteNoteAction, fetchNotesAction } from 'src/redux/ducks/notes'

interface IOwnProps {}

interface IState {}

const mapStateToProps = (state: IStoreState) => ({
  notes: state.notes,
})

type IStateToPropsType = ReturnType<typeof mapStateToProps>

const mapDispatchToProps = {
  deleteNote: deleteNoteAction,
  fetchNotes: fetchNotesAction,
}

type IDispatchToPropsType = typeof mapDispatchToProps

type IProps = IOwnProps & IStateToPropsType & IDispatchToPropsType

class HomePage extends PureComponent<IProps, IState> {
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
          <div className="row between-xs">{this.renderNoteCard()}</div>
        </div>
      </div>
    )
  }

  renderNoteCard = () => {
    return this.props.notes.map((note) => (
      <NoteCard key={note.id} className="col-xs-4" note={note} onChecked={this.onCheckCard} />
    ))
  }

  onCheckCard = (note: INote) => {
    this.props.deleteNote(note)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomePage)
