import classNames from 'classnames'
import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import styles from './NoteCreator.less'
import notes, { createNoteAction } from 'src/redux/ducks/notes'

export class NoteCreator extends PureComponent {
  formRef = null
  titleInput = null
  valueInput = null

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

  createNewNote = (event) => {
    event.preventDefault()
    if (!(this.titleInput.value && this.valueInput.value)) {
      alert('Note Title or Content should not be empty!')
      return
    }

    this.props.createNote({ title: this.titleInput.value, value: this.valueInput.value})
    this.resetForm()
  }

  resetForm = () => {
    this.formRef.reset()
  }
}

const mapDispatchToProps = {
  createNote: notes.createNoteAction,
}

export default connect(null, mapDispatchToProps)(NoteCreator)
