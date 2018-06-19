import { TestBed, inject } from '@angular/core/testing';

import { BranchofficeService } from './branchoffice.service';

describe('BranchofficeService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BranchofficeService]
    });
  });

  it('should be created', inject([BranchofficeService], (service: BranchofficeService) => {
    expect(service).toBeTruthy();
  }));
});
