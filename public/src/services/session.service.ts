import { Injectable } from '@angular/core';

import { HttpClient, HttpParams } from '@angular/common/http';
import { SHA256 } from 'crypto-ts';

import {
  AreaDetailsResponse,
  AreaResponse,
  ChatForm,
  ChatResponse,
  LoginForm,
  LoginResponse,
  LogoutResponse,
  RegistrationForm,
  RegistrationResponse,
  VerificationResponse,
} from 'models/apiTypes';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SessionService {
  login(loginForm: LoginForm): Observable<LoginResponse> {
    const body: LoginForm = {
      email: loginForm.email,
      password: SHA256(loginForm.password) as string,
    };

    return this.http.post<LoginResponse>(
      environment.backendURL + '/login',
      body
    );
  }

  register(
    registrationForm: RegistrationForm
  ): Observable<RegistrationResponse> {
    const body: RegistrationForm = {
      name: registrationForm.name,
      email: registrationForm.email,
      address: registrationForm.address,
      area: registrationForm.area,
      password: SHA256(registrationForm.password) as string,
      additionalNotes: registrationForm.additionalNotes,
    };

    return this.http.post<RegistrationResponse>(
      environment.backendURL + '/registration',
      body
    );
  }

  logout(): Observable<LogoutResponse> | void {
    const mySessionID = localStorage.getItem('sessionID');

    var body: any;
    if (mySessionID) {
      body.sessionID = mySessionID;

      return this.http.post<LogoutResponse>(
        environment.backendURL + '/logout',
        body
      );
    } else {
      console.log('No sessionID found from browser storage.');
    }
  }

  verify(): Observable<VerificationResponse> | void {
    const mySessionID = localStorage.getItem('sessionID');

    var body: any;
    if (mySessionID) {
      body.sessionID = mySessionID;

      return this.http.get<VerificationResponse>(
        environment.backendURL + '/verify',
        {
          params: new HttpParams().set('sessionID', mySessionID),
        }
      );
    } else {
      console.log('No sessionID found from browser storage.');
    }
  }

  chat(chat: ChatForm): Observable<ChatResponse> | void {
    const mySessionID = localStorage.getItem('sessionID');

    var body: any;
    if (mySessionID) {
      body.sessionID = mySessionID;
    } else {
      console.log('No sessionID found from browser storage.');
      body.sessionID = null;
    }

    body.message = chat.message;

    return this.http.post<ChatResponse>(environment.backendURL + '/chat', body);
  }

  getAreaList(): Observable<AreaResponse> {
    return this.http.get<AreaResponse>(environment.backendURL + '/area-list');
  }

  getAreaDetails(): Observable<AreaDetailsResponse> {
    return this.http.get<AreaDetailsResponse>(
      environment.backendURL + '/area-details'
    );
  }

  constructor(private http: HttpClient) {}
}
