export class Constants {
  public static API_ENDPOINT = 'http://192.168.1.172:8080'
  public static GENDER = {
    MALE: 'MALE',
    FEMALE: 'FEMALE'
  };
  public static PET_TYPE = {
    DOG: 'DOG',
    CAT: 'CAT'
  };
  public static PICTURE_UPLOAD_ENDPOINT='https://api.cloudinary.com/v1_1/wrocdodomucloud/image/upload';
  public static DEFAULT_CENTER_LONGITUDE = 19.25;
  public static DEFAULT_CENTER_LATITUDE = 52.06;
  public static DEFAULT_MAP_ZOOM = 6;

  public static DOG_PIN_ICON = {
    url: '../../assets/img/dog_pin.png',
    scaledSize: {
      width: 30,
      height: 50
    }
  };

  public static CAT_PIN_ICON = {
    url: '../../assets/img/cat_pin.png',
    scaledSize: {
      width: 30,
      height: 50
    }
  };
}
