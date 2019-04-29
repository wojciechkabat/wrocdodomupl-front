import { Coordinates } from "./Coordinates";
import { PictureDto } from "./PictureDto";

export class Pet {
  id: number;
  name: string;
  additionalInfo: string;
  lastSeen: Date;
  pictures: PictureDto[];
  phoneNumber: string;
  email: string;
  gender: string;
  type: string;
  coordinates: Coordinates;
  status: string;
}
