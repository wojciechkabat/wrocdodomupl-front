import { Component, Input } from '@angular/core';
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";


@Component({
  selector: 'app-error-pet-modal',
  templateUrl: './error-modal.component.html',
  styleUrls: ['./error-modal.component.scss']
})
export class ErrorModalComponent {


  constructor(public activeModal: NgbActiveModal) {
  }

  @Input()
  public message: string;

}
