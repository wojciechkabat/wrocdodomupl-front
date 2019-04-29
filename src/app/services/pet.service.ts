import { Injectable } from '@angular/core';
import { ApiService } from "./api.service";
import { Observable } from "rxjs/internal/Observable";
import { Pet } from "../models/Pet";

@Injectable({
  providedIn: 'root'
})
export class PetService {

  constructor(private apiService: ApiService) { }

  getAllPetsFromLast30Days(): Observable<Pet[]> {
    return this.apiService.get('pets');
  }

  persistPet(pet: Pet): Observable<Pet> {
    return this.apiService.post('pets', pet);
  }
}
