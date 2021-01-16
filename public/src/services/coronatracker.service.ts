import { Injectable } from '@angular/core';

import { HttpClient, HttpParams } from '@angular/common/http';

import {
  WorldOMeter,
  DailyNewStats,
  TotalTrending,
} from 'models/coronatracker';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class CoronatrackerService {
  constructor(private http: HttpClient) {}

  /**
   * Worldwide total number of cases.
   * Getting response from https://api.coronatracker.com/v3/stats/worldometer/totalTrendingCases
   */
  getTrendingCases(limit: number = 20): Observable<Array<TotalTrending>> {
    return this.http.get<Array<TotalTrending>>(
      'https://api.coronatracker.com/v3/stats/worldometer/totalTrendingCases',
      { params: new HttpParams().set('limit', limit.toString()) }
    );
  }

  /**
   * Gets countries with the top 10 most cases.
   * Getting response from https://api.coronatracker.com/v5/analytics/dailyNewStats
   */
  getTopTen(): Observable<Array<DailyNewStats>> {
    return this.http.get<Array<DailyNewStats>>(
      'https://api.coronatracker.com/v5/analytics/dailyNewStats'
    );
  }

  /**
   * Gets cases in each countries, descending by cases.
   * Getting response from https://api.coronatracker.com/v3/stats/worldometer/topCountry
   */
  getCases(): Observable<Array<WorldOMeter>> {
    return this.http.get<Array<WorldOMeter>>(
      'https://api.coronatracker.com/v3/stats/worldometer/topCountry'
    );
  }
}
