import { Component, Input, OnInit } from '@angular/core';
import { Pet } from "../../models/Pet";
import { faTag, faVenusMars, faInfo, faPhone, faEnvelope, faCalendarAlt } from '@fortawesome/free-solid-svg-icons';
import { Constants } from "../../constants";
@Component({
  selector: 'app-lost-pet-side-panel',
  templateUrl: './lost-pet-side-panel.component.html',
  styleUrls: ['./lost-pet-side-panel.component.scss']
})
export class LostPetSidePanelComponent implements OnInit {

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
    }
  }

}
