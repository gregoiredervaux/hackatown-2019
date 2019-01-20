import {Component, OnInit} from '@angular/core';
import * as L from 'leaflet';
import { MapService } from "./map.service";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'Bedbug flow';

  constructor(private mapService: MapService){

  }

  ngOnInit(){
    const map = L.map('map').setView([45.5088400, -73.5878100], 11);
    map.scrollWheelZoom.disable();

    L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager_nolabels/{z}/{x}/{y}.png', {
      maxZoom: 18
    }).addTo(map);



    this.mapService.client.addLayer(this.mapService.layer);
    this.mapService.client.getLeafletLayer().addTo(map);
  }

}
