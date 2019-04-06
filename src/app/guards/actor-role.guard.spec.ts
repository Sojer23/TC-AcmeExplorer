import { TestBed, async, inject } from '@angular/core/testing';

import { ActorRoleGuard } from './actor-role.guard';

describe('ActorRoleGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ActorRoleGuard]
    });
  });

  it('should ...', inject([ActorRoleGuard], (guard: ActorRoleGuard) => {
    expect(guard).toBeTruthy();
  }));
});
