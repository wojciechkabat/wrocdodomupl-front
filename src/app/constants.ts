export class Constants {
  public static API_ENDPOINT = 'http://192.168.1.172:8080'
  public static GENDER = {
    MALE: 'MALE',
    FEMALE: 'FEMALE',
    UNKNOWN: 'UNKNOWN'
  };
  public static PET_TYPE = {
    DOG: 'DOG',
    CAT: 'CAT'
  };
  public static PET_STATUS = {
    LOST: 'LOST',
    FOUND: 'FOUND'
  };

  public static PICTURE_UPLOAD_ENDPOINT='https://api.cloudinary.com/v1_1/wrocdodomucloud/image/upload';
  public static DEFAULT_CENTER_LONGITUDE = 19.25;
  public static DEFAULT_CENTER_LATITUDE = 52.06;
  public static DEFAULT_MAP_ZOOM = 6;

  public static LOST_DOG_PIN_ICON = {
    url: '../../assets/img/lost_dog_pin.png',
    scaledSize: {
      width: 30,
      height: 50
    }
  };

  public static FOUND_DOG_PIN_ICON = {
    url: '../../assets/img/found_dog_pin.png',
    scaledSize: {
      width: 30,
      height: 50
    }
  };

  public static LOST_CAT_PIN_ICON = {
    url: '../../assets/img/lost_cat_pin.png',
    scaledSize: {
      width: 30,
      height: 50
    }
  };

  public static FOUND_CAT_PIN_ICON = {
    url: '../../assets/img/found_cat_pin.png',
    scaledSize: {
      width: 30,
      height: 50
    }
  };
}
