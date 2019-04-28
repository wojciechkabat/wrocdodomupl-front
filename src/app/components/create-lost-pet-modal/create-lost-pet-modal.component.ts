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
  faCamera
} from '@fortawesome/free-solid-svg-icons';
import { LostPet } from "../../models/LostPet";
import { Coordinates } from "../../models/Coordinates";
import { LostPetService } from "../../services/lost-pet.service";
import { Constants } from "../../constants";
import { PictureUploadModel } from "../../models/PictureUploadModel";
import { PictureUploadService } from "../../services/picture-upload.service";
import { CurrentUserService } from "../../services/current-user.service";
import { MapData } from "../../models/MapData";

@Component({
  selector: 'app-create-lost-pet-modal',
  templateUrl: './create-lost-pet-modal.component.html',
  styleUrls: ['./create-lost-pet-modal.component.scss']
})
export class CreateLostPetModalComponent implements OnInit {
  @ViewChild('agmMap') agmMap: AgmMap;
  petDataForm: FormGroup;

  loadedPictures = [];
  isDataLoading: boolean;

  lostPet: LostPet;

  faPaw = faPaw;
  faCamera = faCamera;
  faPhone = faPhone;
  faEnvelope = faEnvelope;
  faInfo = faInfo;
  faVenusMars = faVenusMars;
  faTag = faTag;
  faCalendarAlt = faCalendarAlt;

  mapData: MapData;

  constructor(private _formBuilder: FormBuilder,
              private lostPetService: LostPetService,
              private currentUserService: CurrentUserService,
              private pictureUploadService: PictureUploadService,
              public activeModal: NgbActiveModal) {
  }

  ngOnInit() {
    this.initializeMap();
    this.lostPet = new LostPet();
    this.lostPet.lastSeen = new Date();

    this.agmMap.mapReady.subscribe(() => {
      this.lostPet.coordinates = new Coordinates(this.agmMap.longitude, this.agmMap.latitude);
    });

    this.petDataForm = this._formBuilder.group({
      name: ['', Validators.required],
      type: [Constants.PET_TYPE.DOG, Validators.required],
      gender: [Constants.GENDER.MALE, Validators.required],
      phoneNumber: [''],
      email: ['', [Validators.required, Validators.pattern(/^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i)]],
      additionalInfo: ['']
    });
  }

  mapMoved(event) {
    this.lostPet.coordinates.longitude = event.lng;
    this.lostPet.coordinates.latitude = event.lat;
  }

  isReadyToSave() {
    return this.petDataForm.valid && this.lostPet.lastSeen && this.lostPet.coordinates.latitude && this.lostPet.coordinates.longitude && this.loadedPictures.length > 0;
  }

  assignDateFromString(dateString: string) {
    if (dateString) {
      this.lostPet.lastSeen = new Date(dateString)
    }
  }

  onFileChange(e) {
    const [file] = e.target.files;
    const pattern = /image-*/;

    if (!file.type.match(pattern)) {
      alert('invalid format');
      return;
    }

    let reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = () => {
      this.loadedPictures = [];
      this.loadedPictures.push(reader.result);
    }
  }


  persistLostPet() {
    if (this.isReadyToSave()) {
      this.isDataLoading = true;
      this.pictureUploadService.uploadPicture(new PictureUploadModel(this.loadedPictures[0], 'pets_tst')).subscribe((response) => {
        const formData = this.petDataForm.getRawValue();
        this.lostPet.name = formData.name;
        this.lostPet.type = formData.type;
        this.lostPet.gender = formData.gender;
        this.lostPet.phoneNumber = formData.phoneNumber;
        this.lostPet.email = formData.email;
        this.lostPet.additionalInfo = formData.additionalInfo;
        this.lostPet.pictureUrl = response.secure_url;

        this.lostPetService.persistLostPet(this.lostPet).subscribe((savedPet: LostPet) => {
          this.isDataLoading = false;
          this.activeModal.close(savedPet);
        })
      });
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
