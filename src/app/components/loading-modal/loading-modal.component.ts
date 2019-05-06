import { Component, Input } from '@angular/core';


@Component({
  selector: 'app-loading-pet-modal',
  templateUrl: './loading-modal.component.html',
  styleUrls: ['./loading-modal.component.scss']
})
export class LoadingModalComponent {

  @Input()
  public message: string;
  @Input()
  public title: string;

}
