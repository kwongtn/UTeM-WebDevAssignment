import { Component } from '@angular/core';
import { SessionService } from 'src/services/session.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'public';
  loginStatus: boolean = false;

  constructor(private sessionService: SessionService) {
    this.sessionService.loginStatus.subscribe((res: boolean) => {
      this.loginStatus = res;
    });
  }
}
