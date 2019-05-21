import { Component, Input, OnInit } from '@angular/core';
import { Pet } from "../../models/Pet";
import { faTag, faVenusMars, faInfo, faPhone, faEnvelope, faCalendarAlt } from '@fortawesome/free-solid-svg-icons';
import { Constants } from "../../constants";
@Component({
  selector: 'app-pet-details-side-panel',
  templateUrl: './pet-details-side-panel.component.html',
  styleUrls: ['./pet-details-side-panel.component.scss']
})
export class PetDetailsSidePanelComponent implements OnInit {

  @Input()
  pet: Pet;

  faTag = faTag;
  faVenusMars = faVenusMars;
  faInfo = faInfo;
  faEnvelope = faEnvelope;
  faPhone = faPhone;
  faCalendarAlt = faCalendarAlt;

  constructor() { }

  ngOnInit() {
  }

  resolveGender(gender) {
    switch (gender) {
      case Constants.GENDER.MALE:
        return 'Samiec';
      case Constants.GENDER.FEMALE:
        return 'Samica';
      case Constants.GENDER.UNKNOWN:
        return 'Nieznana płeć';
      case Constants.GENDER.BOTH:
        return 'Różne płci'
    }
  }

  resolveSidePanelHeaderColor(status: string): string {
    switch (status) {
      case Constants.PET_STATUS.LOST:
        return 'lost';
      case Constants.PET_STATUS.FOUND:
        return 'found';
      case Constants.PET_STATUS.TO_GIVE:
        return 'to-give';
      default:
        return 'no-status';
    }
  }

}
