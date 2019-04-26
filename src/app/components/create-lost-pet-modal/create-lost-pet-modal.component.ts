import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { AgmMap } from "@agm/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { faPaw, faVenusMars, faInfo, faPhone, faEnvelope, faCalendarAlt, faTag } from '@fortawesome/free-solid-svg-icons';
import { LostPet } from "../../models/LostPet";
import { Coordinates } from "../../models/Coordinates";
import { LostPetService } from "../../services/lost-pet.service";

@Component({
  selector: 'app-create-lost-pet-modal',
  templateUrl: './create-lost-pet-modal.component.html',
  styleUrls: ['./create-lost-pet-modal.component.scss']
})
export class CreateLostPetModalComponent implements OnInit {
  @ViewChild('agmMap') agmMap: AgmMap;
  petDataForm: FormGroup;

  lostPet: LostPet;

  faPaw = faPaw;
  faPhone = faPhone;
  faEnvelope = faEnvelope;
  faInfo = faInfo;
  faVenusMars = faVenusMars;
  faTag = faTag;
  faCalendarAlt = faCalendarAlt;

  constructor(private _formBuilder: FormBuilder,
              private lostPetService: LostPetService,
              public activeModal: NgbActiveModal) {}

  ngOnInit() {
    this.lostPet = new LostPet();
    this.lostPet.lastSeen = new Date();

    this.agmMap.mapReady.subscribe(() => {
      this.lostPet.coordinates = new Coordinates(this.agmMap.longitude, this.agmMap.latitude);
    });

    this.petDataForm = this._formBuilder.group({
      name: ['', Validators.required],
      type: ['DOG', Validators.required],
      gender: ['MALE', Validators.required],
      phoneNumber: [''],
      email: [''],
      additionalInfo: ['']
    });
  }

  mapMoved(event) {
    this.lostPet.coordinates.longitude = event.lng;
    this.lostPet.coordinates.latitude = event.lat;
  }

  isReadyToSave() {
    return this.petDataForm.valid && this.lostPet.lastSeen && this.lostPet.coordinates.latitude && this.lostPet.coordinates.longitude;
  }

  assignDateFromString(dateString: string) {
    if(dateString) {
      this.lostPet.lastSeen = new Date(dateString)
    }
  }

  persistLostPet() {
    if(this.isReadyToSave()) {
      const formData = this.petDataForm.getRawValue();
      this.lostPet.name = formData.name;
      this.lostPet.type = formData.type;
      this.lostPet.gender = formData.gender;
      this.lostPet.phoneNumber = formData.phoneNumber;
      this.lostPet.email = formData.email;
      this.lostPet.additionalInfo = formData.additionalInfo;

      this.lostPetService.persistLostPet(this.lostPet).subscribe((savedPet: LostPet) => {
        this.activeModal.close(savedPet);
      })
    }
  }
}
