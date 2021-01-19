import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { ToFromAreaIntent } from 'models/apiTypes';
import { SessionService } from 'src/services/session.service';
import { AreaFromIntentDataSource } from './area-from-intent-datasource';

@Component({
  selector: 'app-area-from-intent',
  templateUrl: './area-from-intent.component.html',
  styleUrls: ['./area-from-intent.component.css'],
})
export class AreaFromIntentComponent implements AfterViewInit, OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<ToFromAreaIntent>;
  dataSource!: AreaFromIntentDataSource;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['area', 'intent'];

  constructor(private sessionService: SessionService) {}

  ngOnInit() {
    this.dataSource = new AreaFromIntentDataSource(this.sessionService);
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
