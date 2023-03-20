import { TestBed } from '@angular/core/testing';

import { SetdataarrService } from './setdataarr.service';

describe('SetdataarrService', () => {
  let service: SetdataarrService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SetdataarrService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
