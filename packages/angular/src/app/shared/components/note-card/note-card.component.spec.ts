import { TestBed, ComponentFixture } from '@angular/core/testing';
import { Component } from '@angular/core';
import { By, BrowserModule } from '@angular/platform-browser';

import { NoteCardComponent } from './note-card.component';

@Component({
  template: '<rt-note-card [note]="note" (checked)="onCheck($event)"></rt-note-card>'
})
class TestComponent {
  newNote: {title: string, content: string, color: string};
  note = {
    title: 'test title',
    content: 'test content'
  };

  onCheck(note) {
    this.newNote = note;
  }
}

describe('NoteCardComponent', () => {
  let fixture: ComponentFixture<TestComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ TestComponent, NoteCardComponent ],
      imports: [ BrowserModule ]
    });

    fixture = TestBed.createComponent(TestComponent);
  });

  it('the componet should have a title', () => {
    fixture.detectChanges();
    const el = fixture.debugElement.query(By.css('.title'));
    expect(el.nativeElement.textContent.trim()).toBe('test title');
  });

  it('the componet will change when click the check', () => {
    fixture.detectChanges();
    const testComponent: TestComponent = fixture.componentInstance;
    const el = fixture.debugElement.query(By.css('.icon'));
    el.triggerEventHandler('click', null);

    expect(testComponent.newNote.title).toBe('test title');
  });
});
