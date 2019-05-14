import { Component, Input } from '@angular/core';
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";


@Component({
  selector: 'app-confirm-pet-modal',
  templateUrl: './confirm-modal.component.html',
  styleUrls: ['./confirm-modal.component.scss']
})
export class ConfirmModalComponent {


  constructor(public activeModal: NgbActiveModal) {
  }

  @Input()
  public title: string;

  @Input()
  public message: string;

}
