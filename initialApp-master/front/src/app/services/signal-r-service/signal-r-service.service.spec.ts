import { TestBed, inject } from '@angular/core/testing';

import { SignalRServiceService } from './signal-r-service.service';

describe('SignalRServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SignalRServiceService]
    });
  });

  it('should be created', inject([SignalRServiceService], (service: SignalRServiceService) => {
    expect(service).toBeTruthy();
  }));
});
