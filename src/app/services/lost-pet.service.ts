import { Injectable } from '@angular/core';
import { ApiService } from "./api.service";
import { Observable } from "rxjs/internal/Observable";
import { Pet } from "../models/Pet";

@Injectable({
  providedIn: 'root'
})
export class LostPetService {

  constructor(private apiService: ApiService) { }

  getLostPetsFromLast30Days(): Observable<Pet[]> {
    return this.apiService.get('pets/lost');
  }

  persistLostPet(lostPet: Pet): Observable<Pet> {
    return this.apiService.post('pets', lostPet);
  }
}
