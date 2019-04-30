import { Constants } from "../constants";

export class Filter {
  status: string;
  type: string;


  constructor() {
    this.status = Constants.FILTER_STATUS.ALL;
    this.type = Constants.FILTER_TYPE.ALL;
  }
}
