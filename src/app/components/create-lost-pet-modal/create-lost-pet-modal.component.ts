import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-create-lost-pet-modal',
  templateUrl: './create-lost-pet-modal.component.html',
  styleUrls: ['./create-lost-pet-modal.component.scss']
})
export class CreateLostPetModalComponent implements OnInit {

  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit() {
  }

}
