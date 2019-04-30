import { Component, OnInit, ViewChild } from '@angular/core';
import { Pet } from "../../models/Pet";
import { Coordinates } from "../../models/Coordinates";
import { faPlusCircle, faFilter } from '@fortawesome/free-solid-svg-icons';
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { AgmMap } from "@agm/core";
import { Constants } from "../../constants";
import { CurrentUserService } from "../../services/current-user.service";
import { MapData } from "../../models/MapData";
import { PetService } from "../../services/pet.service";
import { ReportPetModalComponent } from "../../components/report-pet-modal/report-pet-modal.component";
import { FilterModalComponent } from "../../components/filter-modal/filter-modal.component";
import { Filter } from "../../models/Filter";

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

  @ViewChild('lostPetInfoSidePanel') lostPetInfoSidePanel;
  @ViewChild('addPetButton') addPetButton;
  @ViewChild('filterButton') filterButton;

  constructor(private currentUserService: CurrentUserService,
              private modalService: NgbModal,
              private petService: PetService) {
  }

  ngOnInit(): void {
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
    const modalRef = this.modalService.open(ReportPetModalComponent, {
      backdrop : 'static',
      keyboard : false,
      windowClass: "add-pet-modal"
    });
    modalRef.result.then((savedPet: Pet) => {
      if (savedPet) {
        this.allFoundPets.push(savedPet);
        this.petSelected(savedPet);
        this.resetMapFilter();
        this.recenterMapToPosition(savedPet.coordinates);
      }
    });
  }

  mapReady(map): void {
    this.agmMap = map;
  }

  resolvePinIcon(pet: Pet) {
    if (pet.status === Constants.PET_STATUS.LOST) {
      return pet.type === Constants.PET_TYPE.DOG ? Constants.LOST_DOG_PIN_ICON : Constants.LOST_CAT_PIN_ICON;
    } else {
      return pet.type === Constants.PET_TYPE.DOG ? Constants.FOUND_DOG_PIN_ICON : Constants.FOUND_CAT_PIN_ICON;
    }
  }

  filterButtonClicked(): void {
    const modalRef = this.modalService.open(FilterModalComponent, {
      backdrop : 'static',
      keyboard : false,
      windowClass: "filter-modal"
    });
    modalRef.componentInstance.filter = this.filter;
    modalRef.result.then(() => {
      this.applyMapFilter();
    })
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
      .filter(pet => {
        return this.filter.status === Constants.FILTER_STATUS.ALL ? true : pet.status === this.filter.status
      })
      .filter(pet => {
        return this.filter.type === Constants.FILTER_TYPE.ALL ? true : pet.type === this.filter.type
      });
  }
}
