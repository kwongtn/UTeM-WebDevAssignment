import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LogoutResponse, VerificationResponse } from 'models/apiTypes';
import { SessionService } from 'src/services/session.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'public';
  loginStatus: boolean = false;

  constructor(private sessionService: SessionService, private router: Router) {
    this.sessionService.loginStatus.subscribe((res: boolean) => {
      this.loginStatus = res;
    });
  }

  ngOnInit(): void {
    this.sessionService.verify().subscribe((res: VerificationResponse) => {
      if (res.loginStatus) {
        this.sessionService.setLoginStatus(res.loginStatus);
      }
    });
  }

  logout() {
    this.sessionService.logout().subscribe((res: LogoutResponse) => {
      if (res.logoutStatus) {
        this.sessionService.setLoginStatus(false);
        localStorage.removeItem('sessionID');
        localStorage.removeItem('userDetails');
        this.router.navigate(['']);
      }
    });
  }
}
