import { Injectable } from '@angular/core';
import { Observable } from "rxjs/internal/Observable";
import { ApiService } from "./api.service";
import { PictureUploadModel } from "../models/PictureUploadModel";
import { forkJoin } from "rxjs/internal/observable/forkJoin";
import { map } from "rxjs/operators";
import { Constants } from "../constants";
import { Picture } from "../models/Picture";

@Injectable({
  providedIn: 'root'
})
export class PictureUploadService {

  constructor(private apiService: ApiService) {
  }

  uploadPictures(pictures: Picture[]): Observable<string[]> {
    const pictureUploadObservables: Observable<any>[] = [];
    for (const picture of pictures) {
      pictureUploadObservables.push(this.uploadPicture(new PictureUploadModel(picture.data, 'pets_tst')))
    }
    return forkJoin(pictureUploadObservables)
      .pipe(map(uploadData => {
        const pictureUrls = [];
        for (const uploadedElement of uploadData) {
          pictureUrls.push(uploadedElement.secure_url)
        }
        return pictureUrls;
      }));
  }

  private uploadPicture(pictureUploadMode: PictureUploadModel): Observable<any> {
    return this.apiService.postExternal(Constants.PICTURE_UPLOAD_ENDPOINT, pictureUploadMode);
  }
}
