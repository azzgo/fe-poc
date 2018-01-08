import { Component, OnInit, Output, EventEmitter, ViewChild } from '@angular/core';
import { isEmpty } from 'lodash';

@Component({
  selector: 'rt-note-creator',
  templateUrl: './note-creator.component.html',
  styleUrls: ['./note-creator.component.css']
})
export class NoteCreatorComponent implements OnInit {
  isFocus = false;
  note;

  @Output() newNote = new EventEmitter();

  ngOnInit() {
    this.resetForm();
  }

  createNote() {
    const { title, value } = this.note;
    if (isEmpty(title) || isEmpty(value)) {
      return false;
    }

    this.newNote.next({title, value});
    this.resetForm();
    return false;
  }

  resetForm() {
    this.note = {
      title: '',
      value: '',
    };
  }

}
