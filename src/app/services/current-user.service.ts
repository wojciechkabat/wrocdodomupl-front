import { Injectable } from '@angular/core';
import { Coordinates } from "../models/Coordinates";

@Injectable({
  providedIn: 'root'
})
export class CurrentUserService {

  private currentUserCoordinates: Coordinates;

  constructor() {}

  initPosition() {
    navigator.geolocation.getCurrentPosition((pos) => {
      console.log(pos)
      this.currentUserCoordinates = {
        latitude: +(pos.coords.latitude),
        longitude: +(pos.coords.longitude)
      };
    }, (err) => {
      console.log(err)
    });
  }

  getCurrentUserCoordinates(): Coordinates {
    return this.currentUserCoordinates;
  }
}
