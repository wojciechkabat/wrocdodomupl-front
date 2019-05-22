export class Constants {
  public static API_ENDPOINT = 'https://wrocdodomu-prd.herokuapp.com/';
  public static PICTURES_PRESET = 'pets_prd';
  public static GENDER = {
    MALE: 'MALE',
    FEMALE: 'FEMALE',
    UNKNOWN: 'UNKNOWN',
    BOTH: 'BOTH'
  };
  public static PET_TYPE = {
    DOG: 'DOG',
    CAT: 'CAT'
  };
  public static PET_STATUS = {
    LOST: 'LOST',
    FOUND: 'FOUND',
    TO_GIVE: 'TO_GIVE'
  };

  public static FILTER_TYPE = {
    DOG: 'DOG',
    CAT: 'CAT'
  };

  public static FILTER_STATUS = {
    LOST: 'LOST',
    FOUND: 'FOUND',
    TO_GIVE: 'TO_GIVE'
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


  public static TO_GIVE_DOG_PIN_ICON = {
    url: '../../assets/img/to_give_dog_pin.png',
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

  public static TO_GIVE_CAT_PIN_ICON = {
    url: '../../assets/img/to_give_cat_pin.png',
    scaledSize: {
      width: 30,
      height: 50
    }
  };

  public static MESSAGES = {
    CONFIRMATION_ERROR_MESSAGE: "Nie udało się potwierdzić dodania ogłoszenia. Być może ogłoszenie zostało już wcześniej potwierdzone. W innym przypadku, sprawdź czy link jest prawidłowy.",
    CONFIRMATION_TITLE: "Trwa potwierdzanie",
    CONFIRMATION_MESSAGE: "Trwa potwierdzanie dodania zwierzaka. Może to zająć krótką chwilę...",
    DELETE_ERROR_MESSAGE: "Nie udało się usunąć ogłoszenia. Być może zostało już wcześniej usunięte. W innym przypadku sprawdź, czy link jest prawidłowy.",
  }
}
