import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { WorldOMeter } from 'models/coronatracker';
import { CoronatrackerService } from 'services/coronatracker.service';
import { DailyCasesDataSource } from './daily-cases-datasource';

@Component({
  selector: 'app-daily-cases',
  templateUrl: './daily-cases.component.html',
  styleUrls: ['./daily-cases.component.css'],
})
export class DailyCasesComponent implements AfterViewInit, OnInit {
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort)
  sort!: MatSort;
  @ViewChild(MatTable)
  table!: MatTable<WorldOMeter>;
  dataSource: DailyCasesDataSource = new DailyCasesDataSource(
    this.coronatrackerService
  );

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = [
    'countryName',
    'totalConfirmed',
    'totalDeaths',
    'totalRecovered',
    'dailyConfirmed',
    'dailyDeaths',
    'activeCases',
  ];

  constructor(private coronatrackerService: CoronatrackerService) {}

  ngOnInit() {
    setTimeout(() => {
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      this.table.dataSource = this.dataSource;
    }, 3000);
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      this.table.dataSource = this.dataSource;
    }, 3000);
  }
}
