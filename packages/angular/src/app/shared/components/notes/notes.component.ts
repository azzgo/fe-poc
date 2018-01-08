import { Component, OnInit } from '@angular/core';
import { NotesService } from '../../services/notes.service';

@Component({
  selector: 'rt-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css']
})
export class NotesComponent implements OnInit {
  notes: INote[] = [];

  constructor(private notesService: NotesService) {}

  ngOnInit() {
    this.fetchNotes();
  }

  fetchNotes() {
    this.notesService.getNotes().subscribe(notes => this.notes = notes);
  }

  checkCard(id) {
    const index = this.notes.findIndex(note => note.id === id);
    this.notesService.completeNote(id).subscribe(() => this.fetchNotes());
  }

  addNote(note: INote) {
    this.notesService.createNote(note).subscribe(newNote => {
      this.notes.push(newNote);
    });
  }

}
