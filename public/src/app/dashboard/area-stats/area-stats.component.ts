import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { AreaStats } from 'models/apiTypes';
import { SessionService } from 'src/services/session.service';
import { AreaStatsDataSource } from './area-stats-datasource';

@Component({
  selector: 'app-area-stats',
  templateUrl: './area-stats.component.html',
  styleUrls: ['./area-stats.component.css'],
})
export class AreaStatsComponent implements AfterViewInit, OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<AreaStats>;
  dataSource!: AreaStatsDataSource;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['cases', 'area'];

  constructor(private sessionService: SessionService) {}

  ngOnInit() {
    this.dataSource = new AreaStatsDataSource(this.sessionService);
    this.dataSource.connect().subscribe((res: Array<AreaStats>) => {
      setTimeout(() => {
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        this.table.dataSource = this.dataSource;
      }, 3000);
    });
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      this.table.dataSource = this.dataSource;
    }, 3000);
  }
}
