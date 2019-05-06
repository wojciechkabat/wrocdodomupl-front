import { Injectable } from '@angular/core';
import { NgbModal, NgbModalRef } from "@ng-bootstrap/ng-bootstrap";
import { LoadingModalComponent } from "../components/loading-modal/loading-modal.component";
import { ErrorModalComponent } from "../components/error-modal/error-modal.component";

@Injectable({
  providedIn: 'root'
})
export class PopupService {

  constructor(private modalService: NgbModal) { }

  openLoadingModal(title: string, message: string): NgbModalRef {
    const modalRef = this.modalService.open(LoadingModalComponent, {
      backdrop : 'static',
      keyboard : false,
      windowClass: "add-pet-modal"
    });
    modalRef.componentInstance.message = message;
    modalRef.componentInstance.title = title;
    return modalRef;
  }


  displayErrorModal(message: string): NgbModalRef {
    const modalRef = this.modalService.open(ErrorModalComponent, {
      backdrop : 'static',
      keyboard : false,
      windowClass: "add-pet-modal"
    });
    modalRef.componentInstance.message = message;
    return modalRef;
  }
}
