import { Component, OnInit, ViewChild } from '@angular/core';
import { Pet } from "../../models/Pet";
import { Coordinates } from "../../models/Coordinates";
import { faPlusCircle, faFilter, faExclamation } from '@fortawesome/free-solid-svg-icons';
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { AgmMap } from "@agm/core";
import { Constants } from "../../constants";
import { CurrentUserService } from "../../services/current-user.service";
import { MapData } from "../../models/MapData";
import { PetService } from "../../services/pet.service";
import { ReportPetModalComponent } from "../../components/report-pet-modal/report-pet-modal.component";
import { FilterModalComponent } from "../../components/filter-modal/filter-modal.component";
import { Filter } from "../../models/Filter";
import { ActivatedRoute } from "@angular/router";
import { PopupService } from "../../services/popup.service";

@Component({
  selector: 'app-pet-map',
  templateUrl: './pet-map.component.html',
  styleUrls: ['./pet-map.component.scss']
})
export class PetMapComponent implements OnInit {
  mapData: MapData;
  filter: Filter;

  agmMap: AgmMap;

  allFoundPets: Pet[];
  filteredPets: Pet[];

  selectedPet: Pet;

  faPlusCircle = faPlusCircle;
  faFilter = faFilter;
  faExclamation = faExclamation;

  @ViewChild('lostPetInfoSidePanel') lostPetInfoSidePanel;
  @ViewChild('addPetButton') addPetButton;
  @ViewChild('filterButton') filterButton;

  constructor(private currentUserService: CurrentUserService,
              private modalService: NgbModal,
              private route: ActivatedRoute,
              private popupService: PopupService,
              private petService: PetService) {
  }

  ngOnInit(): void {
    if (this.route.snapshot.url[0] && this.route.snapshot.url[0].path === 'confirmation') {
      this.processPetConfirmation();
    }

    if (this.route.snapshot.url[0] && this.route.snapshot.url[0].path === 'delete') {
      this.processPetDelete();
    }

    this.filter = new Filter();
    this.initializeMap();
    this.initializePets();
  }

  petSelected(pet: Pet) {
    this.selectedPet = pet;
    this.lostPetInfoSidePanel.nativeElement.style.width = "100%";
    this.addPetButton.nativeElement.classList.remove('button-fade-in');
    this.filterButton.nativeElement.classList.remove('button-scale-in');

    this.addPetButton.nativeElement.classList.add('button-fade-out');
    this.filterButton.nativeElement.classList.add('button-scale-out')
  }

  closeDetails() {
    this.selectedPet = null;
    this.lostPetInfoSidePanel.nativeElement.style.width = "0";
    this.addPetButton.nativeElement.classList.remove('button-fade-out');
    this.filterButton.nativeElement.classList.remove('button-scale-out');

    this.addPetButton.nativeElement.classList.add('button-fade-in');
    this.filterButton.nativeElement.classList.add('button-scale-in');
  }

  mapClicked() {
    this.selectedPet = null;
    this.closeDetails();
  }

  initializePets(): void {
    this.petService.getAllPetsFromLast30Days().subscribe(pets => {
        this.allFoundPets = pets;
        this.applyMapFilter();
      }
    );
  }

  openAddDialog(): void {
    this.modalService.open(ReportPetModalComponent, {
      backdrop: 'static',
      keyboard: false,
      windowClass: "add-pet-modal"
    });
  }

  mapReady(map): void {
    this.agmMap = map;
  }

  resolvePinIcon(pet: Pet) {
    if (pet.status === Constants.PET_STATUS.LOST) {
      return pet.type === Constants.PET_TYPE.DOG ? Constants.LOST_DOG_PIN_ICON : Constants.LOST_CAT_PIN_ICON;
    } else if (pet.status === Constants.PET_STATUS.TO_GIVE) {
      return pet.type === Constants.PET_TYPE.DOG ? Constants.TO_GIVE_DOG_PIN_ICON : Constants.TO_GIVE_CAT_PIN_ICON;
    } else {
      return pet.type === Constants.PET_TYPE.DOG ? Constants.FOUND_DOG_PIN_ICON : Constants.FOUND_CAT_PIN_ICON;
    }
  }

  filterButtonClicked(): void {
    const modalRef = this.modalService.open(FilterModalComponent, {
      backdrop: 'static',
      keyboard: false,
      windowClass: "filter-modal"
    });
    modalRef.componentInstance.filter = this.filter;
    modalRef.result.then(() => {
      this.applyMapFilter();
    })
  }

  isCustomFilterApplied() {
    return !(this.filter.statuses.length === 3 && this.filter.types.length === 2);
  }

  private initializeMap(): void {
    const currentUserCoordinates = this.currentUserService.getCurrentUserCoordinates();
    this.mapData = new MapData(
      currentUserCoordinates ? currentUserCoordinates.longitude : Constants.DEFAULT_CENTER_LONGITUDE,
      currentUserCoordinates ? currentUserCoordinates.latitude : Constants.DEFAULT_CENTER_LATITUDE,
      currentUserCoordinates ? 10 : Constants.DEFAULT_MAP_ZOOM
    )
  }

  private recenterMapToPosition(coordinates: Coordinates) {
    this.mapData.centerLongitude = coordinates.longitude;
    this.mapData.centerLatitude = coordinates.latitude;
    this.mapData.zoom = 15;
  }

  private resetMapFilter() {
    this.filter = new Filter();
    this.applyMapFilter();
  }

  private applyMapFilter() {
    this.filteredPets = this.allFoundPets
      .filter(pet => this.filter.statuses.includes(pet.status))
      .filter(pet => this.filter.types.includes(pet.type));
  }

  private processPetConfirmation() {
    const confirmationToken = this.route.snapshot.queryParams['token'];
    const confirmingModal = this.popupService.openLoadingModal(Constants.MESSAGES.CONFIRMATION_TITLE, Constants.MESSAGES.CONFIRMATION_MESSAGE);
    this.petService.confirmPet(confirmationToken)
      .subscribe((pet) => {
        this.allFoundPets.push(pet);
        this.resetMapFilter();
        confirmingModal.close();
        this.petSelected(pet);
        this.recenterMapToPosition(pet.coordinates);
        this.popupService.displayToast("Pomyślnie potwierdzono dodanie ogłoszenia!", "OK")
      }, (error) => {
        console.error(error);
        confirmingModal.close();
        this.popupService.displayErrorModal(Constants.MESSAGES.CONFIRMATION_ERROR_MESSAGE)
      });
  }

  private processPetDelete() {
    const deleteToken = this.route.snapshot.queryParams['token'];
    this.popupService.displayConfirmModal("Potwierdź usunięcie", "Czy na pewno chcesz usunąć swoje ogłoszenie?").result
      .then(() => {
        this.petService.deletePet(deleteToken)
          .subscribe((deletedPet) => {
            this.allFoundPets.splice(this.allFoundPets.findIndex(pet => pet.id === deletedPet.id), 1);
            this.resetMapFilter();
            this.popupService.displayToast("Pomyślnie usunięto ogłoszenie.", "OK")
          }, (error) => {
            console.error(error);
            this.popupService.displayErrorModal(Constants.MESSAGES.DELETE_ERROR_MESSAGE)
          });
      })
  }
}
