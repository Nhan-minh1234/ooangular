import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MorePeojectComponent } from './more-peoject.component';

describe('MorePeojectComponent', () => {
  let component: MorePeojectComponent;
  let fixture: ComponentFixture<MorePeojectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MorePeojectComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MorePeojectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
