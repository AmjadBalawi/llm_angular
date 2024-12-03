import { TestBed } from '@angular/core/testing';

import { DestinationActivitiesService } from './destination-activities.service';

describe('DestinationActivitiesService', () => {
  let service: DestinationActivitiesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DestinationActivitiesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
