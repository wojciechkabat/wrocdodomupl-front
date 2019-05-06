import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { AgmCoreModule } from "@agm/core";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { ApiService } from "./services/api.service";
import { HttpClientModule } from "@angular/common/http";
import { WelcomeComponent } from "./pages/welcome/welcome.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MatCheckboxModule, MatStepperModule } from "@angular/material";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AgmJsMarkerClustererModule } from '@agm/js-marker-clusterer';
import { CurrentUserService } from "./services/current-user.service";
import { PictureUploadService } from "./services/picture-upload.service";
import { PetService } from "./services/pet.service";
import { PetMapComponent } from "./pages/pet-map/pet-map.component";
import { PetDetailsSidePanelComponent } from "./components/pet-details-side-panel/pet-details-side-panel.component";
import { ReportPetModalComponent } from "./components/report-pet-modal/report-pet-modal.component";
import { FilterModalComponent } from "./components/filter-modal/filter-modal.component";
import { PopupService } from "./services/popup.service";
import { LoadingModalComponent } from "./components/loading-modal/loading-modal.component";
import { ErrorModalComponent } from "./components/error-modal/error-modal.component";

@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    HeaderComponent,
    FooterComponent,
    PetMapComponent,
    PetDetailsSidePanelComponent,
    ReportPetModalComponent,
    FilterModalComponent,
    LoadingModalComponent,
    ErrorModalComponent
  ],
  entryComponents: [
    ReportPetModalComponent,
    FilterModalComponent,
    LoadingModalComponent,
    ErrorModalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyC3cX9j_OEkbS4WmGtsfUpkp4GQPebNs7c'
    }),
    FontAwesomeModule,
    NgbModule.forRoot(),
    HttpClientModule,
    BrowserAnimationsModule,
    MatStepperModule,
    MatCheckboxModule,
    FormsModule,
    ReactiveFormsModule,
    AgmJsMarkerClustererModule
  ],
  providers: [
    ApiService,
    PetService,
    CurrentUserService,
    PictureUploadService,
    PopupService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
