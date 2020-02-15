import { TestBed } from '@angular/core/testing';

import { EventPlannerService } from './event-planner.service';

describe('EventPlannerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EventPlannerService = TestBed.get(EventPlannerService);
    expect(service).toBeTruthy();
  });
});
