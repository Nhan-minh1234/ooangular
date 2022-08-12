import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskAutocompleteComponent } from './task-autocomplete.component';

describe('TaskAutocompleteComponent', () => {
  let component: TaskAutocompleteComponent;
  let fixture: ComponentFixture<TaskAutocompleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TaskAutocompleteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskAutocompleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
