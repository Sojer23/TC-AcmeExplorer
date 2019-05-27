import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TripPushComponent } from './trip-push.component';

describe('TripPushComponent', () => {
  let component: TripPushComponent;
  let fixture: ComponentFixture<TripPushComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TripPushComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TripPushComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
