import { TestBed } from '@angular/core/testing';

import { CulturalTipsService } from './cultural-tips.service';

describe('CulturalTipsService', () => {
  let service: CulturalTipsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CulturalTipsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
