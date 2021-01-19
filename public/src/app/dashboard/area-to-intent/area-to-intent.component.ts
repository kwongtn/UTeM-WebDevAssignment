import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { ToFromAreaIntent } from 'models/apiTypes';
import { SessionService } from 'src/services/session.service';
import { AreaToIntentDataSource } from './area-to-intent-datasource';

@Component({
  selector: 'app-area-to-intent',
  templateUrl: './area-to-intent.component.html',
  styleUrls: ['./area-to-intent.component.css'],
})
export class AreaToIntentComponent implements AfterViewInit, OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<ToFromAreaIntent>;
  dataSource!: AreaToIntentDataSource;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['area', 'intent'];

  constructor(private sessionService: SessionService) {}

  ngOnInit() {
    this.dataSource = new AreaToIntentDataSource(this.sessionService);
    this.dataSource.connect().subscribe((res: Array<ToFromAreaIntent>) => {
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
