import { TestBed } from '@angular/core/testing';

import { CanDeactivateGuard } from './can-deactivate.service';

describe('CanDeactivateService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CanDeactivateGuard = TestBed.get(CanDeactivateGuard);
    expect(service).toBeTruthy();
  });
});
