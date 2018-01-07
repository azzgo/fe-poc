import classNames from 'classnames'
import React, { FormEvent, PureComponent } from 'react'
import { connect } from 'react-redux'
import { toastr } from 'react-redux-toastr'
import { createNoteAction } from 'src/actions/notesAction'
import styles from './NoteCreator.less'

interface IState {}

const mapDispatchToProps = {
  createNote: createNoteAction,
}

type IDispatchToPropsType = typeof mapDispatchToProps

type IProps = IDispatchToPropsType

export class NoteCreator extends PureComponent<IProps, IState> {
  public titleInput: HTMLInputElement
  public valueInput: HTMLInputElement

  public render() {
    return (
      <div className={classNames(styles.noteCreator, 'shadow-2')}>
        <form className="row" onSubmit={this.createNewNote}>
          <input
            type="text"
            ref={(input) => this.titleInput = input}
            name="newNoteTitle"
            placeholder="Title"
            className={classNames('col-xs-10', styles.title)}
            autoComplete="off"
          />
          <input
            type="text"
            ref={(input) => this.valueInput = input}
            name="newNoteValue"
            placeholder="Take a note..."
            className="col-xs-10"
            autoComplete="off"
          />
          <div className="actions col-xs-12 row between-xs">
            <button type="submit" className="btn-light">
              Done
            </button>
          </div>
        </form>
      </div>
    )
  }

  public createNewNote = (event: FormEvent<{}>) => {
    event.preventDefault()
    if (!(this.titleInput.value && this.valueInput.value)) {
      toastr.error('Note Title or Content should not be empty!', null)
      return
    }

    this.props.createNote({ title: this.titleInput.value, value: this.valueInput.value})
  }
}

export default connect<undefined, IDispatchToPropsType>(null, mapDispatchToProps)(NoteCreator)
