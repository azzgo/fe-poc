import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { returntypeof } from 'react-redux-typescript'
import { Link } from 'react-router-dom'

import classNames from 'classnames'

import { fetchNotesAction } from 'src/actions/notesAction'
import { INote, NoteCard } from 'src/app/Home/components/NoteCard/NoteCard'
import { NoteCreator } from 'src/app/Home/components/NoteCreator/NoteCreator'
import styles from './Home.less'

interface IOwnProps {}

interface IState {}

const mapStateToProps = (state: any) => ({
  notes: state.notes,
})

const mapStateToPropsType = returntypeof(mapStateToProps)

type IStateToPropsType = typeof mapStateToPropsType

const mapDispatchToProps = {
  fetchNotes: fetchNotesAction,
}

type IDispatchToPropsType = typeof mapDispatchToProps

@(connect(mapStateToProps, mapDispatchToProps) as InferableConnectType<
  IStateToPropsType,
  IDispatchToPropsType,
  IOwnProps
>)
export class HomePage extends PureComponent<IOwnProps & IStateToPropsType & IDispatchToPropsType, IState> {
  public componentWillMount() {
    this.props.fetchNotes()
  }

  public render() {
    const { notes } = this.props
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

  public onCheckCard(note: INote) {
    // const index = this.notes.findIndex(note => note.id === id);
    // this.notesService.completeNote(id).subscribe(() => this.fetchNotes());
  }
}
