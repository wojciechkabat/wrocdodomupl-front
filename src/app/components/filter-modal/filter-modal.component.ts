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

  isDogsSelected: boolean;
  isCatsSelected: boolean;
  isLostSelected: boolean;
  isFoundSelected: boolean;

  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit() {
    this.isLostSelected = this.filter.status === Constants.FILTER_STATUS.ALL || this.filter.status === Constants.FILTER_STATUS.LOST;
    this.isFoundSelected = this.filter.status === Constants.FILTER_STATUS.ALL || this.filter.status === Constants.FILTER_STATUS.FOUND;
    this.isDogsSelected = this.filter.type === Constants.FILTER_TYPE.ALL || this.filter.type === Constants.FILTER_TYPE.DOG;
    this.isCatsSelected = this.filter.type === Constants.FILTER_TYPE.ALL || this.filter.type === Constants.FILTER_TYPE.CAT;
  }

  toggleAllStatuses() {
    const isAllSelected = this.isAllStatusesSelected();
    this.isLostSelected = !isAllSelected;
    this.isFoundSelected = !isAllSelected;
  }


  toggleAllTypes() {
    const isAllSelected = this.isAllTypesSelected();
    this.isDogsSelected = !isAllSelected;
    this.isCatsSelected = !isAllSelected;
  }

  isAllStatusesSelected() {
    return this.isLostSelected && this.isFoundSelected;
  }

  isAllTypesSelected() {
    return this.isDogsSelected && this.isCatsSelected;
  }

  isNothingSelected() {
    return !(this.isDogsSelected || this.isCatsSelected) || !(this.isLostSelected || this.isFoundSelected)
  }

  applyFilter() {
    if(this.isAllStatusesSelected()) {
      this.filter.status = Constants.FILTER_STATUS.ALL;
    } else {
      this.filter.status = this.isLostSelected ? Constants.FILTER_STATUS.LOST : Constants.FILTER_STATUS.FOUND;
    }

    if(this.isAllTypesSelected()) {
      this.filter.type = Constants.FILTER_TYPE.ALL;
    } else {
      this.filter.type = this.isDogsSelected ? Constants.FILTER_TYPE.DOG : Constants.FILTER_TYPE.CAT;
    }

    this.activeModal.close();
  }

}
