import { Injectable } from '@angular/core';

import { HttpClient, HttpParams } from '@angular/common/http';
import * as sha256 from 'sha256';

import {
  AreaDetailsResponse,
  AreaResponse,
  AreaStats,
  ChatForm,
  ChatResponse,
  LoginForm,
  LoginResponse,
  LogoutResponse,
  RegistrationForm,
  RegistrationResponse,
  ToFromAreaIntent,
  VerificationResponse,
} from 'models/apiTypes';
import { environment } from 'src/environments/environment';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SessionService {
  loginStatus: Subject<boolean> = new Subject<boolean>();
  areaStats: Subject<Array<AreaStats>> = new Subject<Array<AreaStats>>();
  toAreaIntent: Subject<Array<ToFromAreaIntent>> = new Subject<
    Array<ToFromAreaIntent>
  >();
  fromAreaIntent: Subject<Array<ToFromAreaIntent>> = new Subject<
    Array<ToFromAreaIntent>
  >();

  // Login function
  login(loginForm: LoginForm): Observable<LoginResponse> {
    const body: LoginForm = {
      email: loginForm.email,
      password: sha256(loginForm.password),
    };
    console.log(body);
    return this.http.post<LoginResponse>(
      environment.backendURL + '/login.php',
      body
    );
  }

  setLoginStatus(loginStatus: boolean) {
    this.loginStatus.next(loginStatus);
  }

  register(
    registrationForm: RegistrationForm
  ): Observable<RegistrationResponse> {
    const body: RegistrationForm = {
      name: registrationForm.name,
      email: registrationForm.email,
      address: registrationForm.address,
      area: registrationForm.area,
      password: sha256(registrationForm.password),
      additionalNotes: registrationForm.additionalNotes,
    };

    return this.http.post<RegistrationResponse>(
      environment.backendURL + '/register.php',
      body
    );
  }

  logout(): Observable<LogoutResponse> {
    const mySessionID = localStorage.getItem('sessionID');

    var body: any = {};
    if (mySessionID) {
      body.sessionID = mySessionID;
    } else {
      console.log('No sessionID found from browser storage.');
    }
    return this.http.post<LogoutResponse>(
      environment.backendURL + '/logout.php',
      body
    );
  }

  verify(): Observable<VerificationResponse> | any {
    const mySessionID = localStorage.getItem('sessionID');

    var body: any = {};
    if (mySessionID) {
      body.sessionID = mySessionID;

      return this.http.get<VerificationResponse>(
        environment.backendURL + '/verify.php',
        {
          params: new HttpParams().set('sessionID', mySessionID),
        }
      );
    } else {
      console.log('No sessionID found from browser storage.');
    }
  }

  chat(chat: ChatForm): Observable<ChatResponse> {
    const mySessionID = localStorage.getItem('sessionID');

    var body: any = {};
    if (mySessionID) {
      body.sessionID = mySessionID;
    } else {
      console.log('No sessionID found from browser storage.');
      body.sessionID = null;
    }

    body.message = chat.message;

    return this.http.post<ChatResponse>(
      'http://localhost:3000' + '/chat',
      body
    );
  }

  getAreaList(): Observable<AreaResponse> {
    return this.http.get<AreaResponse>(
      environment.backendURL + '/area-list.php'
    );
  }

  getAreaDetails(): void {
    this.http
      .get<AreaDetailsResponse>(environment.backendURL + '/area-details.php')
      .subscribe((res: AreaDetailsResponse) => {
        this.areaStats.next(res.areaStats);
        this.toAreaIntent.next(res.toAreaIntent);
        this.fromAreaIntent.next(res.fromAreaIntent);
      });
  }

  constructor(private http: HttpClient) {}
}
