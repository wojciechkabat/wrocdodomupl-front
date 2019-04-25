import { Injectable } from '@angular/core';
import { ApiService } from "./api.service";
import { Observable } from "rxjs/internal/Observable";
import { LostPet } from "../models/LostPet";

@Injectable({
  providedIn: 'root'
})
export class LostPetService {

  constructor(private apiService: ApiService) { }

  getLostPetsFromLast30Days(): Observable<LostPet[]> {
    return this.apiService.get('pets/lost');
  }
}
