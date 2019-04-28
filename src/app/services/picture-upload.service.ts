import { Injectable } from '@angular/core';
import { Observable } from "rxjs/internal/Observable";
import { ApiService } from "./api.service";
import { Constants } from "../constants";
import { PictureUploadModel } from "../models/PictureUploadModel";

@Injectable({
  providedIn: 'root'
})
export class PictureUploadService {

  constructor(private apiService: ApiService) { }

  uploadPicture(pictureUploadMode: PictureUploadModel): Observable<any> {
    return this.apiService.postExternal(Constants.PICTURE_UPLOAD_ENDPOINT, pictureUploadMode);
  }
}
