import { Component, OnInit, Input } from '@angular/core';
import * as carto from '@carto/carto.js';

@Component({
  selector: 'app-options',
  templateUrl: './options.component.html',
  styleUrls: ['./options.component.css']
})
export class OptionsComponent implements OnInit {

  @Input() yearFilter;

  Years: number[];
  selectedYear: number[];

  constructor() {
    this.Years = [2011,2012,2013,2014,2015,2016,2017,2018];
    this.selectedYear = [2011,2012,2013,2014,2015,2016,2017,2018];
  }

  ngOnInit() {
  }

  onClick(year_value) {
    let isThere = false;
    for (let index in this.selectedYear){
      if (year_value === this.selectedYear[index]){
        this.selectedYear.splice(parseInt(index), 1)
        isThere = true;
        console.log(this.selectedYear);
      }
    }
    console.log(isThere);
    if (!isThere){
      this.selectedYear.push(year_value);
      this.applyFilters();
      console.log(this.selectedYear);
    }
    console.log(this.yearFilter);
  }

  applyFilters () {
    this.yearFilter.setFilter({in: this.selectedYear});
  }
}
