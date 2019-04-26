import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { LostPetsComponent } from './pages/lost-pets/lost-pets.component';
import { AgmCoreModule } from "@agm/core";
import { LostPetSidePanelComponent } from './components/lost-pet-side-panel/lost-pet-side-panel.component';
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { GeoLocationService } from "./services/geo-location.service";
import { ApiService } from "./services/api.service";
import { LostPetService } from "./services/lost-pet.service";
import { HttpClientModule } from "@angular/common/http";
import { CreateLostPetModalComponent } from './components/create-lost-pet-modal/create-lost-pet-modal.component';
import { WelcomeComponent } from "./pages/welcome/welcome.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MatFormFieldModule, MatStepperModule } from "@angular/material";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    HeaderComponent,
    FooterComponent,
    LostPetsComponent,
    LostPetSidePanelComponent,
    CreateLostPetModalComponent
  ],
  entryComponents: [
    CreateLostPetModalComponent
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
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    GeoLocationService,
    ApiService,
    LostPetService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
