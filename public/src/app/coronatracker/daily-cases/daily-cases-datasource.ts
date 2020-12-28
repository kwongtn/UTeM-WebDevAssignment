import { DataSource } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { map } from 'rxjs/operators';
import { Observable, of as observableOf, merge } from 'rxjs';
import { CoronatrackerService } from 'services/coronatracker.service';
import { WorldOMeter } from 'models/coronatracker';

/**
 * Data source for the DailyCases view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */
export class DailyCasesDataSource extends DataSource<WorldOMeter> {
  data: WorldOMeter[] = [];
  paginator!: MatPaginator;
  sort!: MatSort;

  constructor(private coronatrackerService: CoronatrackerService) {
    super();
    coronatrackerService.getCases().subscribe((cases: Array<WorldOMeter>) => {
      this.data = cases;
    });
  }

  /**
   * Connect this data source to the table. The table will only update when
   * the returned stream emits new items.
   * @returns A stream of the items to be rendered.
   */
  connect(): Observable<WorldOMeter[]> {
    // Combine everything that affects the rendered data into one update
    // stream for the data-table to consume.
    const dataMutations = [
      observableOf(this.data),
      this.paginator.page,
      this.sort.sortChange,
    ];

    return merge(...dataMutations).pipe(
      map(() => {
        return this.getPagedData(this.getSortedData([...this.data]));
      })
    );
  }

  /**
   *  Called when the table is being destroyed. Use this function, to clean up
   * any open connections or free any held resources that were set up during connect.
   */
  disconnect() {}

  /**
   * Paginate the data (client-side). If you're using server-side pagination,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getPagedData(data: WorldOMeter[]) {
    const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
    return data.splice(startIndex, this.paginator.pageSize);
  }

  /**
   * Sort the data (client-side). If you're using server-side sorting,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getSortedData(data: WorldOMeter[]) {
    if (!this.sort.active || this.sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      const isAsc = this.sort.direction === 'asc';
      switch (this.sort.active) {
        case 'countryName':
          return compare(a.countryName, b.countryName, isAsc);
        case 'totalConfirmed':
          return compare(a.totalConfirmed, b.totalConfirmed, isAsc);
        case 'totalDeaths':
          return compare(a.totalDeaths, b.totalDeaths, isAsc);
        case 'totalRecovered':
          return compare(a.totalRecovered, b.totalRecovered, isAsc);
        case 'dailyConfirmed':
          return compare(a.dailyConfirmed, b.dailyConfirmed, isAsc);
        case 'dailyDeaths':
          return compare(a.dailyDeaths, b.dailyDeaths, isAsc);
        case 'activeCases':
          return compare(a.activeCases, b.activeCases, isAsc);
        default:
          return 0;
      }
    });
  }
}

/** Simple sort comparator for example ID/Name columns (for client-side sorting). */
function compare(a: string | number, b: string | number, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
