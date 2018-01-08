
import { Injectable } from '@angular/core';
import { environment } from './../../../environments/environment';
import { HttpClient } from '@angular/common/http';


@Injectable()
export class NotesService {
  apiUrl = `${environment.apiUrl}/notes`;

  constructor(private http: HttpClient) {}

  getNotes() {
    return this.http.get<INote[]>(this.apiUrl);
  }

  createNote(note: INote) {
    return this.http.post<INote>(this.apiUrl, note);
  }

  completeNote(noteID) {
    return this.http.delete(`${this.apiUrl}/${noteID}`);
  }
}
