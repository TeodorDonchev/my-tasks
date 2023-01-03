import { TestBed } from '@angular/core/testing';

import { BackendCacheService } from './backend-cache.service';

describe('BackendCacheService', () => {
  let service: BackendCacheService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BackendCacheService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
