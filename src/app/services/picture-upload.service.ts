import { Injectable } from '@angular/core';
import { Observable } from "rxjs/internal/Observable";
import { ApiService } from "./api.service";
import { PictureUploadModel } from "../models/PictureUploadModel";
import { forkJoin } from "rxjs/internal/observable/forkJoin";
import { map } from "rxjs/operators";
import { Constants } from "../constants";
import { Picture } from "../models/Picture";
import { PictureDto } from "../models/PictureDto";

@Injectable({
  providedIn: 'root'
})
export class PictureUploadService {

  constructor(private apiService: ApiService) {
  }

  uploadPictures(pictures: Picture[]): Observable<PictureDto[]> {
    const pictureUploadObservables: Observable<any>[] = [];
    for (const picture of pictures) {
      pictureUploadObservables.push(this.uploadPicture(new PictureUploadModel(picture.data, 'pets_tst')))
    }
    return forkJoin(pictureUploadObservables)
      .pipe(map(uploadData => {
        const pictureDtos = [];
        for (const uploadedElement of uploadData) {
          pictureDtos.push(new PictureDto(uploadedElement.public_id, uploadedElement.secure_url))
        }
        return pictureDtos;
      }));
  }

  private uploadPicture(pictureUploadMode: PictureUploadModel): Observable<any> {
    return this.apiService.postExternal(Constants.PICTURE_UPLOAD_ENDPOINT, pictureUploadMode);
  }
}
