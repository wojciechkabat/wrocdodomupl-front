import { Injectable } from '@angular/core';
import { ApiService } from "./api.service";
import { Observable } from "rxjs/internal/Observable";
import { Pet } from "../models/Pet";
import { throwError } from "rxjs/internal/observable/throwError";

@Injectable({
  providedIn: 'root'
})
export class PetService {

  private readonly UUID_REGEX = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/;

  constructor(private apiService: ApiService) { }

  getAllPetsFromLast30Days(): Observable<Pet[]> {
    return this.apiService.get('pets');
  }

  persistPet(pet: Pet): Observable<Pet> {
    return this.apiService.post('pets', pet);
  }

  confirmPet(confirmationToken: string): Observable<Pet> {
    if(this.UUID_REGEX.test(confirmationToken)) {
      return this.apiService.put(`pets/confirmation?token=${confirmationToken}`, {})
    } else {
      return throwError("Incorrect format of UUID");
    }
  }
}
