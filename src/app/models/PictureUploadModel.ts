export class PictureUploadModel {
  file: any;
  upload_preset: string;


  constructor(file: any, upload_preset: string) {
    this.file = file;
    this.upload_preset = upload_preset;
  }
}
