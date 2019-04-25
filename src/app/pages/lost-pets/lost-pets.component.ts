import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { LostPet } from "../../models/LostPet";
import { Coordinates } from "../../models/Coordinates";
import { GeoLocationService } from "../../services/geo-location.service";
import { LostPetService } from "../../services/lost-pet.service";
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { CreateLostPetModalComponent } from "../../components/create-lost-pet-modal/create-lost-pet-modal.component";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-lost-pets',
  templateUrl: './lost-pets.component.html',
  styleUrls: ['./lost-pets.component.scss']
})
export class LostPetsComponent implements OnInit {
  currentUserCoordinates: Coordinates;
  lostPets: LostPet[];
  selectedPet: LostPet;

  faPlusCircle = faPlusCircle;

  @ViewChild('lostPetInfoSidePanel') lostPetInfoSidePanel;

  constructor(private geoLocationService: GeoLocationService,
              private modalService: NgbModal,
              private lostPetsService: LostPetService) { }

  ngOnInit(): void {
    this.initializeLostPets();

    this.geoLocationService.getPosition().subscribe(
      (pos: Position) => {
        this.currentUserCoordinates = {
          latitude:  +(pos.coords.latitude),
          longitude: +(pos.coords.longitude)
        };
      });
  }

  petMarkerClicked(pet: LostPet) {
    this.selectedPet = pet;
    this.lostPetInfoSidePanel.nativeElement.style.width = "100%";
  }

  closeDetails() {
    this.selectedPet = null;
    this.lostPetInfoSidePanel.nativeElement.style.width = "0";
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
    const modalRef = this.modalService.open(CreateLostPetModalComponent);
  }
}
