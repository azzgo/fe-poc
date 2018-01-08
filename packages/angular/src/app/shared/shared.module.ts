import { ApiInterceptor } from './services/api.interceptor ';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NotesService } from './services/notes.service';
import { NotesComponent } from './components/notes/notes.component';
import { AppBarComponent } from './components/app-bar/app-bar.component';
import { NoteCardComponent } from './components/note-card/note-card.component';
import { NoteCreatorComponent } from './components/note-creator/note-creator.component';
import { MainLayoutComponent } from './components/main-layout/main-layout.component';
import { AuthService } from './services/auth.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    HttpClientModule,
  ],
  declarations: [
    AppBarComponent,
    NotesComponent,
    NoteCardComponent,
    NoteCreatorComponent,
    MainLayoutComponent,
  ],
  exports: [
    FormsModule,
    HttpClientModule,
    AppBarComponent,
    NotesComponent,
    NoteCardComponent,
    NoteCreatorComponent,
    MainLayoutComponent,
  ],
  providers: [
    NotesService,
    AuthService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ApiInterceptor,
      multi: true,
    },
  ]
})
export class SharedModule { }
