import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LogoutResponse } from 'models/apiTypes';
import { SessionService } from 'src/services/session.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'public';
  loginStatus: boolean = false;

  constructor(private sessionService: SessionService, private router: Router) {
    this.sessionService.loginStatus.subscribe((res: boolean) => {
      this.loginStatus = res;
    });
  }

  logout() {
    this.sessionService.logout().subscribe((res: LogoutResponse) => {
      if (res.logoutStatus) {
        this.sessionService.setLoginStatus(false);
        localStorage.removeItem('sessionID');
        this.router.navigate(['']);
      }
    });
  }
}
