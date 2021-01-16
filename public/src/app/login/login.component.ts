import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginResponse } from 'models/apiTypes';
import { SessionService } from 'src/services/session.service';

import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm = this.fb.group({
    email: [null, Validators.compose([Validators.required, Validators.email])],
    password: [null, Validators.required],
  });

  constructor(
    private fb: FormBuilder,
    private sessionService: SessionService,
    private router: Router,
    public dialog: MatDialog
  ) {}

  onSubmit() {
    // Send login credentials to server
    console.log('Submit');

    if (this.loginForm.valid) {
      // Submit the login request
      this.sessionService
        .login({
          email: this.loginForm.get('email')?.value,
          password: this.loginForm.get('password')?.value,
        })
        .subscribe((res: LoginResponse) => {
          if (res.loginStatus) {
            this.router.navigate(['']);
            localStorage.setItem('sessionID', res.sessionID as string);
          }

          this.sessionService.setLoginStatus(res.loginStatus);

          this.openDialog(res.loginStatus);
        });
    } else {
      console.log('Error in login form.');
    }
  }

  ngOnInit(): void {}

  openDialog(loginStatus: boolean) {
    this.dialog.open(LoginStatusDialog, {
      data: loginStatus,
    });
  }
}

// Dialog stuff starts here
@Component({
  selector: 'login-status-dialog',
  templateUrl: './login-status-dialog.html',
})
export class LoginStatusDialog {
  loginStatus: boolean = false;
  constructor(@Inject(MAT_DIALOG_DATA) public data: boolean) {
    this.loginStatus = data;
    console.log(data);
  }
}
