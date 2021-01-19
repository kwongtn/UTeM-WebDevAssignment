import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { SessionService } from 'src/services/session.service';
import {
  AreaDetailsResponse,
  AreaStats,
  ToFromAreaIntent,
} from 'models/apiTypes';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  showDashboard: boolean = false;

  constructor(private sessionService: SessionService) {
    this.sessionService.getAreaDetails();
  }

  ngOnInit() {
    setTimeout(() => {
      this.showDashboard = true;
    }, 5000);
  }
}
