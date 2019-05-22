import { Component, HostListener, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { PictureDto } from "../../models/PictureDto";
import { faArrowRight, faArrowLeft } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-picture-viewer',
  templateUrl: './picture-viewer.component.html',
  styleUrls: ['./picture-viewer.component.scss']
})
export class PictureViewerComponent implements OnInit {
  @HostListener('window:keyup', ['$event'])
  keyEvent(event: KeyboardEvent) {
    if(event.keyCode === 39){
      this.rightButtonClicked()
    }
    if(event.keyCode === 37){
      this.leftButtonClicked()
    }
  }

  faArrowRight = faArrowRight;
  faArrowLeft = faArrowLeft;

  currentlyDisplayedIndex = 0;

  @Input()
  pictures: PictureDto[];

  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit() {
  }

  leftButtonClicked() {
    if(this.currentlyDisplayedIndex > 0) {
      this.currentlyDisplayedIndex--;
    }
  }

  rightButtonClicked() {
    if (this.currentlyDisplayedIndex + 1 < this.pictures.length) {
      this.currentlyDisplayedIndex++;
    }
  }

}
