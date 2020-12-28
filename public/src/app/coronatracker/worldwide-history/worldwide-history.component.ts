import { Component, OnInit, HostListener } from '@angular/core';
import { NgxChartsModule } from '@swimlane/ngx-charts';

import { CoronatrackerService } from 'services/coronatracker.service';
import {
  WorldOMeter,
  DailyNewStats,
  TotalTrending,
} from 'models/coronatracker';

import { ChartDataElement, ChartData, BarChartData } from 'models/ngx-charts';

@Component({
  selector: 'app-worldwide-history',
  templateUrl: './worldwide-history.component.html',
  styleUrls: ['./worldwide-history.component.css'],
})
export class WorldwideHistoryComponent implements OnInit {
  screenHeight: number = 1080;
  screenWidth: number = 1920;
  multi: BarChartData = [];

  view: [number, number] = [this.screenWidth * 0.85, this.screenHeight * 0.5];

  // options
  legend: boolean = true;
  showLabels: boolean = true;
  animations: boolean = true;
  xAxis: boolean = true;
  yAxis: boolean = true;
  showYAxisLabel: boolean = true;
  showXAxisLabel: boolean = true;
  xAxisLabel: string = 'Time';
  yAxisLabel: string = 'Cases';
  timeline: boolean = true;

  colorScheme = {
    domain: ['#5AA454', '#E44D25', '#CFC0BB', '#7aa3e5', '#a8385d', '#aae3f5'],
  };

  constructor(private coronatrackerService: CoronatrackerService) {
    this.getScreenSize();
    Object.assign(this, this.multi);
  }

  @HostListener('window:resize', ['$event'])
  getScreenSize(event?: any) {
    this.screenHeight = window.innerHeight;
    this.screenWidth = window.innerWidth;
    this.view = [this.screenWidth * 0.85, this.screenHeight * 0.5];
  }

  onSelect(data: any): void {
    // console.log('Item clicked', JSON.parse(JSON.stringify(data)));
  }

  onActivate(data: any): void {
    // console.log('Activate', JSON.parse(JSON.stringify(data)));
  }

  onDeactivate(data: any): void {
    // console.log('Deactivate', JSON.parse(JSON.stringify(data)));
  }

  ngOnInit(): void {
    this.coronatrackerService
      .getTrendingCases(100)
      .subscribe((res: Array<TotalTrending>) => {
        var totalConfirmed = new ChartData('Total Confirmed');
        var totalDeaths = new ChartData('Total Deaths');
        var totalRecovered = new ChartData('Total Recovered');

        var dataProcess: Promise<BarChartData> = new Promise(
          (resolve, reject) => {
            res.forEach(
              (
                value: TotalTrending,
                index: number,
                array: Array<TotalTrending>
              ) => {
                var myDate = new Date(value.lastUpdated)
                  .toDateString()
                  .slice(4);

                totalConfirmed.series.push({
                  name: myDate,
                  value: value.totalConfirmed,
                });

                totalDeaths.series.push({
                  name: myDate,
                  value: value.totalDeaths,
                });

                totalRecovered.series.push({
                  name: myDate,
                  value: value.totalRecovered,
                });

                if (index === array.length - 1) {
                  resolve([totalConfirmed, totalDeaths, totalRecovered]);
                }
              }
            );
          }
        );

        dataProcess.then((data: BarChartData) => {
          this.multi = data;
        });
      });
  }
}
