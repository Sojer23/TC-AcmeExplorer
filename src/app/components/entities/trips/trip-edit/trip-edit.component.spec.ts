import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TripEditComponent } from './trip-edit.component';

describe('TripEditComponent', () => {
  let component: TripEditComponent;
  let fixture: ComponentFixture<TripEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TripEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TripEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
