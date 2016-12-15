/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { CitationService } from '../services/citation.service';

describe('Service: Citation', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CitationService]
    });
  });

  it('should ...', inject([CitationService], (service: CitationService) => {
    expect(service).toBeTruthy();
  }));
});
