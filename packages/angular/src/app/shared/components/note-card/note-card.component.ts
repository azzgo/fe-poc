import {Component, Input, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'rt-note-card',
  templateUrl: './note-card.component.html',
  styleUrls: ['./note-card.component.css']
})
export class  NoteCardComponent {
  @Input() note;
  @Output() checked = new EventEmitter();

  onChecked() {
    this.checked.next(this.note);
  }
}
