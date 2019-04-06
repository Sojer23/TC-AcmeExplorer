import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeniedAccessPageComponent } from './denied-access-page.component';

describe('DeniedAccessPageComponent', () => {
  let component: DeniedAccessPageComponent;
  let fixture: ComponentFixture<DeniedAccessPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeniedAccessPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeniedAccessPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
