import { Injectable } from '@angular/core';
import * as carto from '@carto/carto.js';

@Injectable({
  providedIn: 'root'
})
export class MapService {

  public source: any;
  public style: any;
  public layer: any;
  public yearFilter: any;
  public client: any;

  constructor() {

    this.client = new carto.Client({
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
  }
}
