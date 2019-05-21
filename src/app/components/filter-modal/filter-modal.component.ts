import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { Filter } from "../../models/Filter";
import { Constants } from "../../constants";

@Component({
  selector: 'app-filter-modal',
  templateUrl: './filter-modal.component.html',
  styleUrls: ['./filter-modal.component.scss']
})
export class FilterModalComponent implements OnInit {
  @Input()
  filter: Filter;

  filterCopy: Filter;

  LOST = Constants.FILTER_STATUS.LOST;
  FOUND = Constants.FILTER_STATUS.FOUND;
  TO_GIVE = Constants.FILTER_STATUS.TO_GIVE;

  DOG = Constants.FILTER_TYPE.DOG;
  CAT = Constants.FILTER_TYPE.CAT;

  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit() {
    this.filterCopy = { ...this.filter }
  }

  toggleAllStatuses() {
    const isAllSelected = this.isAllStatusesSelected();
    if (isAllSelected) {
      this.filterCopy.statuses = [];
    } else {
      this.filterCopy.statuses = [this.FOUND, this.LOST, this.TO_GIVE];
    }
  }


  toggleAllTypes() {
    const isAllSelected = this.isAllTypesSelected();
    if (isAllSelected) {
      this.filterCopy.types = [];
    } else {
      this.filterCopy.types = [this.CAT, this.DOG];
    }
  }

  isAllStatusesSelected() {
    return this.filterCopy.statuses.includes(this.LOST) && this.filterCopy.statuses.includes(this.FOUND) && this.filterCopy.statuses.includes(this.TO_GIVE);
  }

  isAllTypesSelected() {
    return this.filterCopy.types.includes(this.DOG) && this.filterCopy.types.includes(this.CAT);
  }

  isNothingSelected() {
    return this.filterCopy.statuses.length === 0 || this.filterCopy.types.length === 0;
  }

  toggleStatus(status: string) {
    const indexOfStatus = this.filterCopy.statuses.indexOf(status);
    if(indexOfStatus === -1) {
      this.filterCopy.statuses.push(status);
    } else {
      this.filterCopy.statuses.splice(indexOfStatus, 1);
    }
  }


  toggleType(type: string) {
    const indexOfType = this.filterCopy.types.indexOf(type);
    if(indexOfType === -1) {
      this.filterCopy.types.push(type);
    } else {
      this.filterCopy.types.splice(indexOfType, 1);
    }
  }

  applyFilter() {
    this.filter.statuses = this.filterCopy.statuses.slice();
    this.filter.types = this.filterCopy.types.slice();
    this.activeModal.close();
  }

}
