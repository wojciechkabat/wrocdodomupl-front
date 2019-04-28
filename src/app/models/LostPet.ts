import { Coordinates } from "./Coordinates";

export class LostPet {
  id: number;
  name: string;
  additionalInfo: string;
  lastSeen: Date;
  pictureUrls: string[];
  phoneNumber: string;
  email: string;
  gender: string;
  type: string;
  coordinates: Coordinates;
}
