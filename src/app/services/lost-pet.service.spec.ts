import { TestBed } from '@angular/core/testing';

import { PetService } from './lost-pet.service';

describe('LostPetService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PetService = TestBed.get(PetService);
    expect(service).toBeTruthy();
  });
});
