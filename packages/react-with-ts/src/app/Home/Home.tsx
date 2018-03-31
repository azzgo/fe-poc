import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { returntypeof } from 'react-redux-typescript'

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

const mapStateToPropsType = returntypeof(mapStateToProps)

type IStateToPropsType = typeof mapStateToPropsType

const mapDispatchToProps = {
  deleteNote: deleteNoteAction,
  fetchNotes: fetchNotesAction,
}

type IDispatchToPropsType = typeof mapDispatchToProps

type IProps = IOwnProps & IStateToPropsType & IDispatchToPropsType

@(connect(mapStateToProps, mapDispatchToProps) as InferableConnectType<IProps>)
export class HomePage extends PureComponent<IProps, IState> {
  public componentWillMount () {
    this.props.fetchNotes()
  }

  public render () {
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

  public renderNoteCard = () => {
    return this.props.notes.map((note) => (
      <NoteCard key={note.id} className="col-xs-4" note={note} onChecked={this.onCheckCard} />
    ))
  }

  public onCheckCard = (note: INote) => {
    this.props.deleteNote(note)
  }
}
