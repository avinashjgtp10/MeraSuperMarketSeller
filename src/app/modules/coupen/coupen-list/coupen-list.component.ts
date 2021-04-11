import { Component, OnInit,QueryList, ViewChildren, ViewEncapsulation } from '@angular/core';
import {DecimalPipe} from '@angular/common';
import {Observable} from 'rxjs';

import {Country} from './country';
import {CountryService} from './country.service';
import {NgbdSortableHeader, SortEvent} from './sortable.directive'

@Component({
  selector: 'app-coupen-list',
  templateUrl: './coupen-list.component.html',
  styleUrls: ['./coupen-list.component.scss'],
  encapsulation:ViewEncapsulation.None,
  providers: [CountryService, DecimalPipe]
})
export class CoupenListComponent implements OnInit {
  countries$: Observable<Country[]>;
  total$: Observable<number>;
  
  @ViewChildren(NgbdSortableHeader) headers!: QueryList<NgbdSortableHeader>;
  constructor(public service: CountryService) {
    this.countries$ = service.countries$;
    this.total$ = service.total$;
  }
  onSort({column, direction}: SortEvent) {
    // resetting other headers
    this.headers.forEach(header => {
      if (header.sortable !== column) {
        header.direction = '';
      }
    });

    this.service.sortColumn = column;
    this.service.sortDirection = direction;
  }
  ngOnInit(): void {
  }

}
