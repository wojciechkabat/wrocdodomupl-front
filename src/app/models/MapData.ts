export class MapData {
  centerLongitude: number;
  centerLatitude: number;
  zoom: number;


  constructor(centerLongitude: number, centerLatitude: number, zoom: number) {
    this.centerLongitude = centerLongitude;
    this.centerLatitude = centerLatitude;
    this.zoom = zoom;
  }
}
