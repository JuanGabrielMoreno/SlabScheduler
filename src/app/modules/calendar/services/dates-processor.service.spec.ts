import { TestBed } from '@angular/core/testing';

import { DatesProcessorService } from './dates-processor.service';

describe('DatesProcessorService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DatesProcessorService = TestBed.get(DatesProcessorService);
    expect(service).toBeTruthy();
  });
});
