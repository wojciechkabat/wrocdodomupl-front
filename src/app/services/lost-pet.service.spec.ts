import { TestBed } from '@angular/core/testing';

import { LostPetService } from './lost-pet.service';

describe('LostPetService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LostPetService = TestBed.get(LostPetService);
    expect(service).toBeTruthy();
  });
});
