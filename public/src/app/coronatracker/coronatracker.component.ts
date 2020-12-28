import { Component } from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';

@Component({
  selector: 'app-coronatracker',
  templateUrl: './coronatracker.component.html',
  styleUrls: ['./coronatracker.component.css'],
})
export class CoronatrackerComponent {
  /** Based on the screen size, switch from standard to one column per row */
  cards = [{ title: 'Card 3', cols: 1, rows: 2 }];

  constructor() {}
}
