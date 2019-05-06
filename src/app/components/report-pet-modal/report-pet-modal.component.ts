import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { AgmMap } from "@agm/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import {
  faPaw,
  faVenusMars,
  faInfo,
  faPhone,
  faEnvelope,
  faCalendarAlt,
  faTag,
  faTrash,
  faCamera,
  faSearch,
  faDog
} from '@fortawesome/free-solid-svg-icons';
import { Pet } from "../../models/Pet";
import { Coordinates } from "../../models/Coordinates";
import { Constants } from "../../constants";
import { PictureUploadService } from "../../services/picture-upload.service";
import { CurrentUserService } from "../../services/current-user.service";
import { MapData } from "../../models/MapData";
import { Picture } from "../../models/Picture";
import { PictureDto } from "../../models/PictureDto";
import { PetService } from "../../services/pet.service";

@Component({
  selector: 'app-report-pet-modal',
  templateUrl: './report-pet-modal.component.html',
  styleUrls: ['./report-pet-modal.component.scss']
})
export class ReportPetModalComponent implements OnInit {
  @ViewChild('agmMap') agmMap: AgmMap;
  petDataForm: FormGroup;

  loadedPictures: Picture[] = [];
  isDataLoading: boolean;

  pet: Pet;

  faPaw = faPaw;
  faCamera = faCamera;
  faPhone = faPhone;
  faEnvelope = faEnvelope;
  faInfo = faInfo;
  faVenusMars = faVenusMars;
  faTag = faTag;
  faTrash = faTrash;
  faCalendarAlt = faCalendarAlt;
  faSearch = faSearch;
  faDog = faDog;

  mapData: MapData;
  isPersisted = false;

  constructor(private _formBuilder: FormBuilder,
              private lostPetService: PetService,
              private currentUserService: CurrentUserService,
              private pictureUploadService: PictureUploadService,
              public activeModal: NgbActiveModal) {
  }

  ngOnInit() {
    this.initializeMap();
    this.pet = new Pet();
    this.pet.lastSeen = new Date();

    this.agmMap.mapReady.subscribe(() => {
      this.pet.coordinates = new Coordinates(this.agmMap.longitude, this.agmMap.latitude);
    });

    this.petDataForm = this._formBuilder.group({
      name: [''],
      type: [Constants.PET_TYPE.DOG, Validators.required],
      status: [Validators.required],
      gender: [Constants.GENDER.MALE, Validators.required],
      phoneNumber: [''],
      email: ['', [Validators.required, Validators.pattern(/^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i)]],
      additionalInfo: ['']
    });
  }

  mapMoved(event) {
    this.pet.coordinates.longitude = event.lng;
    this.pet.coordinates.latitude = event.lat;
  }

  isReadyToSave() {
    return this.petDataForm.valid && this.pet.lastSeen && this.pet.coordinates.latitude && this.pet.coordinates.longitude && this.loadedPictures.length > 0;
  }

  assignDateFromString(dateString: string) {
    if (dateString) {
      this.pet.lastSeen = new Date(dateString)
    }
  }

  onFileAdded(e) {
    const [file] = e.target.files;
    const pattern = /image-*/;

    if (!file.type.match(pattern)) {
      alert('invalid format');
      return;
    }

    let reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = () => {
      this.loadedPictures.push(new Picture(e.target.files[0].name, reader.result));
    }
  }

  removePicture(picture: Picture) {
    const index = this.loadedPictures.indexOf(picture);
    this.loadedPictures.splice(index, 1);
  }


  persistLostPet() {
    if (this.isReadyToSave()) {
      this.isDataLoading = true;

      this.pictureUploadService.uploadPictures(this.loadedPictures).subscribe((pictures: PictureDto[]) => {
        const formData = this.petDataForm.getRawValue();
        this.pet.name = formData.name;
        this.pet.type = formData.type;
        this.pet.gender = formData.gender;
        this.pet.phoneNumber = formData.phoneNumber;
        this.pet.email = formData.email;
        this.pet.status = formData.status;
        this.pet.additionalInfo = formData.additionalInfo;
        this.pet.pictures = pictures;

        this.lostPetService.persistPet(this.pet).subscribe(() => {
          this.isDataLoading = false;
          this.isPersisted = true;
        })
      })
    }
  }

  clearFileInput(e) {
    e.target.value = null;
  }

  resolveModalHeaderColor() {
    switch (this.petDataForm.controls.status.value) {
      case Constants.PET_STATUS.LOST:
        return 'lost';
      case Constants.PET_STATUS.FOUND:
        return 'found';
      default:
        return 'no-status';
    }
  }

  private initializeMap() {
    const currentUserCoordinates = this.currentUserService.getCurrentUserCoordinates();
    this.mapData = new MapData(
      currentUserCoordinates ? currentUserCoordinates.longitude : Constants.DEFAULT_CENTER_LONGITUDE,
      currentUserCoordinates ? currentUserCoordinates.latitude : Constants.DEFAULT_CENTER_LATITUDE,
      currentUserCoordinates ? 10 : Constants.DEFAULT_MAP_ZOOM
    )
  }
}
