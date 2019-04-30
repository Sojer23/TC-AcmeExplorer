import { TestBed } from '@angular/core/testing';

import { AplicationService } from './aplication.service';

describe('AplicationService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AplicationService = TestBed.get(AplicationService);
    expect(service).toBeTruthy();
  });
});
