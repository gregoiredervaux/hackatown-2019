import {Component, OnInit} from '@angular/core';
import * as L from 'leaflet';
import * as carto from '@carto/carto.js';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Bedbug flow';

  source: any;
  style: any;
  layer: any;
  yearFilter: any;

  ngOnInit(){
    const map = L.map('map').setView([45.5088400, -73.5878100], 11);
    map.scrollWheelZoom.disable();

    L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager_nolabels/{z}/{x}/{y}.png', {
      maxZoom: 18
    }).addTo(map);

    const client = new carto.Client({
      apiKey: 'c67680b46c8b90988e19ffba1d932b76dc6ae44f',
      username: 'hackamo'
    });

    this.source = new carto.source.Dataset('declarations_exterminations_punaises_de_lit_1');
    this.style = new carto.style.CartoCSS(`
        #layer {
          marker-width: 7;
          marker-fill: #EE4D5A;
          marker-line-color: #FFFFFF;
        }
      `);

    this.yearFilter = new carto
      .filter
      .Category('year',
        {in: [2011,2012,2013,2014,2015,2016,2017,2018]});
    this.source.addFilter(this.yearFilter);

    this.layer = new carto.layer.Layer(this.source, this.style);

    client.addLayer(this.layer);
    client.getLeafletLayer().addTo(map);
  }


}
