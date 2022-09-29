import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GanttRowComponent } from './gantt-row.component';

describe('GanttRowComponent', () => {
  let component: GanttRowComponent;
  let fixture: ComponentFixture<GanttRowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GanttRowComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GanttRowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
