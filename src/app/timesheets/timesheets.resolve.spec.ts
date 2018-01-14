import { TestBed, inject } from '@angular/core/testing';

import { TimesheetsResolve } from './timesheets.resolve';

describe('TimesheetsResolveService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TimesheetsResolve]
    });
  });

  it('should be created', inject([TimesheetsResolve], (service: TimesheetsResolve) => {
    expect(service).toBeTruthy();
  }));
});
