import { Injectable } from '@angular/core';

import { HttpClient, HttpParams } from '@angular/common/http';
import { SHA256 } from 'crypto-ts';

import {
  ChatForm,
  LoginForm,
  LogoutForm,
  RegistrationForm,
} from 'models/apiTypes';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SessionService {
  login(loginForm: LoginForm) {
    const body: LoginForm = {
      email: loginForm.email,
      password: SHA256(loginForm.password) as string,
    };

    // TODO: Action after response
    this.http.post(environment.backendURL + '/login', body);
  }

  register(registrationForm: RegistrationForm) {
    const body: RegistrationForm = {
      name: registrationForm.name,
      email: registrationForm.email,
      address: registrationForm.address,
      area: registrationForm.area,
      password: SHA256(registrationForm.password) as string,
      additionalNotes: registrationForm.additionalNotes,
    };

    // TODO: Action after response
    this.http.post(environment.backendURL + '/registration', body);
  }

  logout() {
    const mySessionID = localStorage.getItem('sessionID');

    var body: any;
    if (mySessionID) {
      body.sessionID = mySessionID;

      // TODO: Action after response
      this.http.post(environment.backendURL + '/logout', body);
    } else {
      console.log('No sessionID found from browser storage.');
    }
  }

  verify() {
    const mySessionID = localStorage.getItem('sessionID');

    var body: any;
    if (mySessionID) {
      body.sessionID = mySessionID;

      // TODO: Action after response
      this.http.get(environment.backendURL + '/verify', {
        params: new HttpParams().set('sessionID', mySessionID),
      });
    } else {
      console.log('No sessionID found from browser storage.');
    }
  }

  chat(chat: ChatForm) {
    const mySessionID = localStorage.getItem('sessionID');

    var body: any;
    if (mySessionID) {
      body.sessionID = mySessionID;
    } else {
      console.log('No sessionID found from browser storage.');
      body.sessionID = null;
    }

    body.message = chat.message;

    // TODO: Action after response
    this.http.post(environment.backendURL + '/chat', body);
  }

  getAreaList() {
    // TODO: Action after response
    this.http.get(environment.backendURL + '/area-list');
  }

  getAreaDetails(){
    // TODO: Action after response
    this.http.get(environment.backendURL + '/area-details');
  }

  constructor(private http: HttpClient) {}
}
