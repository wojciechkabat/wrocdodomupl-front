export class PictureDto {
  pictureId: string;
  pictureUrl: any;


  constructor(pictureId: string, pictureUrl: any) {
    this.pictureId = pictureId;
    this.pictureUrl = pictureUrl;
  }
}
