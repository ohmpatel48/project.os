import { TestBed } from '@angular/core/testing';

import { SetdatarrService } from './setdataarr.service';

describe('SetdataarrService', () => {
  let service: SetdatarrService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SetdatarrService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
