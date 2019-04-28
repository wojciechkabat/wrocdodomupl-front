import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { LostPet } from "../../models/LostPet";
import { Coordinates } from "../../models/Coordinates";
import { LostPetService } from "../../services/lost-pet.service";
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { CreateLostPetModalComponent } from "../../components/create-lost-pet-modal/create-lost-pet-modal.component";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { AgmMap } from "@agm/core";
import { Constants } from "../../constants";
import { CurrentUserService } from "../../services/current-user.service";
import { MapData } from "../../models/MapData";

@Component({
  selector: 'app-lost-pets',
  templateUrl: './lost-pets.component.html',
  styleUrls: ['./lost-pets.component.scss']
})
export class LostPetsComponent implements OnInit {
  mapData: MapData;

  agmMap: AgmMap;
  lostPets: LostPet[];
  selectedPet: LostPet;

  faPlusCircle = faPlusCircle;
  dogPinIcon = Constants.DOG_PIN_ICON;
  catPinIcon = Constants.CAT_PIN_ICON;


  @ViewChild('lostPetInfoSidePanel') lostPetInfoSidePanel;
  @ViewChild('addPetButton') addPetButton;

  constructor(private currentUserService: CurrentUserService,
              private modalService: NgbModal,
              private lostPetsService: LostPetService) {
  }

  ngOnInit(): void {
    this.initializeMap();
    this.initializeLostPets();
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
    const modalRef = this.modalService.open(CreateLostPetModalComponent, {
      backdrop : 'static',
      keyboard : false,
      windowClass: "add-pet-modal"
    });
    modalRef.result.then((savedPet: LostPet) => {
      if (savedPet) {
        this.lostPets.push(savedPet);
        this.petSelected(savedPet);
        this.recenterMapToPosition(savedPet.coordinates);
      }
    });
  }

  recenterMapToPosition(coordinates: Coordinates) {
    this.mapData.centerLongitude = coordinates.longitude;
    this.mapData.centerLatitude = coordinates.latitude;
    this.mapData.zoom = 15;
  }

  mapReady(map) {
    this.agmMap = map;
  }

  private initializeMap() {
    const currentUserCoordinates = this.currentUserService.getCurrentUserCoordinates();
    this.mapData = new MapData(
      currentUserCoordinates ? currentUserCoordinates.longitude : Constants.DEFAULT_CENTER_LONGITUDE,
      currentUserCoordinates ? currentUserCoordinates.latitude : Constants.DEFAULT_CENTER_LATITUDE,
      currentUserCoordinates ? 10 : Constants.DEFAULT_MAP_ZOOM
    )
  }
}
