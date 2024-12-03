import { TestBed } from '@angular/core/testing';

import { HiddenGemsService } from './hidden-gems.service';

describe('HiddenGemsService', () => {
  let service: HiddenGemsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HiddenGemsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
