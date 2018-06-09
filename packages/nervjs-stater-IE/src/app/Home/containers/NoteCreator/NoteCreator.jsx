import classNames from 'classnames'
import notie from 'notie'
import React, { FormEvent, PureComponent } from 'react'
import { connect } from 'react-redux'
import styles from './NoteCreator.less'
import { createNoteAction } from 'src/redux/ducks/notes'

export class NoteCreator extends PureComponent {
  formRef: HTMLFormElement
  titleInput: HTMLInputElement
  valueInput: HTMLInputElement

  render () {
    return (
      <div className={classNames(styles.noteCreator, 'shadow-2')}>
        <form className="row" onSubmit={this.createNewNote} ref={((form) => this.formRef = form)}>
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

  createNewNote = (event: FormEvent<{}>) => {
    event.preventDefault()
    if (!(this.titleInput.value && this.valueInput.value)) {
      notie.alert({
        type: 'error',
        text: 'Note Title or Content should not be empty!',
      })
      return
    }

    this.props.createNote({ title: this.titleInput.value, value: this.valueInput.value})
    this.resetForm()
  }

  resetForm = () => {
    this.formRef.reset()
  }
}

export default connect(null, mapDispatchToProps)(NoteCreator)
