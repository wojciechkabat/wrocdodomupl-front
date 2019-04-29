import { Component, Input, OnInit } from '@angular/core';
import { Pet } from "../../models/Pet";
import { faTag, faVenusMars, faInfo, faPhone, faEnvelope, faCalendarAlt } from '@fortawesome/free-solid-svg-icons';
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
    return gender === 'MALE'? 'Samiec' : 'Samica';
  }

}
