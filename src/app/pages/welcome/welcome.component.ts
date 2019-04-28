import { Component, OnInit } from '@angular/core';
import { CurrentUserService } from "../../services/current-user.service";

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit {

  constructor(private currentUserService: CurrentUserService) { }

  ngOnInit() {
    this.currentUserService.initPosition();
  }

}
