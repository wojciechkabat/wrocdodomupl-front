import { Coordinates } from "./Coordinates";

export class LostPet {
  id: number;
  name: string;
  additionalInfo: string;
  lastSeen: Date;
  pictureUrl: string;
  phoneNumber: string;
  email: string;
  gender: string;
  coordinates: Coordinates;
}
