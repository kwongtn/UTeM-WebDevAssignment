import { Component, HostListener, OnInit } from '@angular/core';
import { DailyNewStats, TotalTrending } from 'models/coronatracker';
import { BarChartData, ChartData } from 'models/ngx-charts';
import { CoronatrackerService } from 'src/services/coronatracker.service';

@Component({
  selector: 'app-top-cases',
  templateUrl: './top-cases.component.html',
  styleUrls: ['./top-cases.component.css'],
})
export class TopCasesComponent implements OnInit {
  screenHeight: number = 1080;
  screenWidth: number = 1920;
  multi: BarChartData = [];

  view: [number, number] = [this.screenWidth * 0.8, this.screenHeight * 0.45];

  // options
  legend: boolean = true;
  showLabels: boolean = true;
  animations: boolean = true;
  gradient: boolean = false;
  showXAxis: boolean = true;
  showYAxis: boolean = true;
  showYAxisLabel: boolean = false;
  showXAxisLabel: boolean = true;
  xAxisLabel: string = 'Cases';
  yAxisLabel: string = 'Cases';
  showLegend: boolean = true;

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
    this.view = [this.screenWidth * 0.8, this.screenHeight * 0.45];
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
      .getTopTen()
      .subscribe((res: Array<DailyNewStats>) => {
        var dataProcess: Promise<BarChartData> = new Promise(
          (resolve, reject) => {
            var resolveArray: BarChartData = [];
            res.forEach(
              (
                value: DailyNewStats,
                index: number,
                array: Array<DailyNewStats>
              ) => {
                resolveArray.push({
                  name: value.country,
                  series: [
                    {
                      name: 'Daily Cases',
                      value: value.daily_cases,
                    },
                    {
                      name: 'Daily Deaths',
                      value: value.daily_deaths,
                    },
                  ],
                });

                if (index === array.length - 1) {
                  resolve(resolveArray);
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
