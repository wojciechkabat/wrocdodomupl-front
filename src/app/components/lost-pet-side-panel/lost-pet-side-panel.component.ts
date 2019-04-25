import { Component, Input, OnInit } from '@angular/core';
import { LostPet } from "../../models/LostPet";
import { faPaw, faVenusMars, faInfo, faPhone, faEnvelope, faCalendarAlt } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-lost-pet-side-panel',
  templateUrl: './lost-pet-side-panel.component.html',
  styleUrls: ['./lost-pet-side-panel.component.scss']
})
export class LostPetSidePanelComponent implements OnInit {

  @Input()
  pet: LostPet;

  faPaw = faPaw;
  faVenusMars = faVenusMars;
  faInfo = faInfo;
  faEnvelope = faEnvelope;
  faPhone = faPhone;
  faCalendarAlt = faCalendarAlt;

  constructor() { }

  ngOnInit() {
  }

}
