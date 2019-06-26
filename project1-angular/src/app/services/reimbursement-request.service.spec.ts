import { TestBed } from '@angular/core/testing';

import { ReimbursementRequestService } from './reimbursement-request.service';

describe('ReimbursementRequestService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ReimbursementRequestService = TestBed.get(ReimbursementRequestService);
    expect(service).toBeTruthy();
  });
});
