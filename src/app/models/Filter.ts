import { Constants } from "../constants";

export class Filter {
  statuses: string[];
  types: string[];


  constructor() {
    this.statuses = [Constants.FILTER_STATUS.FOUND, Constants.FILTER_STATUS.LOST, Constants.FILTER_STATUS.TO_GIVE];
    this.types = [Constants.FILTER_TYPE.CAT, Constants.FILTER_TYPE.DOG];
  }
}
