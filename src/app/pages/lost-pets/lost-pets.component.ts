import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { LostPet } from "../../models/LostPet";
import { Coordinates } from "../../models/Coordinates";
import { GeoLocationService } from "../../services/geo-location.service";
import { LostPetService } from "../../services/lost-pet.service";
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { CreateLostPetModalComponent } from "../../components/create-lost-pet-modal/create-lost-pet-modal.component";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { AgmMap } from "@agm/core";

@Component({
  selector: 'app-lost-pets',
  templateUrl: './lost-pets.component.html',
  styleUrls: ['./lost-pets.component.scss']
})
export class LostPetsComponent implements OnInit {
  mapCenterLatitude: number;
  mapCenterLongitude: number;
  mapZoom: number;

  agmMap: AgmMap;
  currentUserCoordinates: Coordinates;
  lostPets: LostPet[];
  selectedPet: LostPet;

  faPlusCircle = faPlusCircle;

  @ViewChild('lostPetInfoSidePanel') lostPetInfoSidePanel;
  @ViewChild('addPetButton') addPetButton;

  constructor(private geoLocationService: GeoLocationService,
              private modalService: NgbModal,
              private lostPetsService: LostPetService) {
  }

  ngOnInit(): void {
    this.mapCenterLatitude = 51;
    this.mapCenterLongitude = 21;
    this.mapZoom = 10;
    this.initializeLostPets();

    this.geoLocationService.getPosition().subscribe(
      (pos: Position) => {
        this.currentUserCoordinates = {
          latitude: +(pos.coords.latitude),
          longitude: +(pos.coords.longitude)
        };
      });
  }

  petSelected(pet: LostPet) {
    this.selectedPet = pet;
    this.lostPetInfoSidePanel.nativeElement.style.width = "100%";
    this.addPetButton.nativeElement.classList.remove('button-fade-in');
    this.addPetButton.nativeElement.classList.add('button-fade-out');
  }

  closeDetails() {
    this.selectedPet = null;
    this.lostPetInfoSidePanel.nativeElement.style.width = "0";
    this.addPetButton.nativeElement.classList.remove('button-fade-out');
    this.addPetButton.nativeElement.classList.add('button-fade-in');
  }

  mapClicked() {
    this.selectedPet = null;
    this.closeDetails();
  }

  initializeLostPets() {
    this.lostPetsService.getLostPetsFromLast30Days().subscribe(pets => {
        this.lostPets = pets;
      }
    );
  }

  openAddDialog() {
    const modalRef = this.modalService.open(CreateLostPetModalComponent, {windowClass: "add-pet-modal"});
    modalRef.result.then((savedPet: LostPet) => {
      if (savedPet) {
        this.lostPets.push(savedPet);
        this.petSelected(savedPet);
        this.recenterMapToPosition(savedPet.coordinates);
      }
    });
  }

  recenterMapToPosition(coordinates: Coordinates) {
    this.mapCenterLongitude = coordinates.longitude;
    this.mapCenterLatitude = coordinates.latitude;
    this.mapZoom = 15;
  }

  mapReady(map) {
    this.agmMap = map;
  }
}
