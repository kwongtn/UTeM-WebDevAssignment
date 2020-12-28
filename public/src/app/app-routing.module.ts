import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AboutComponent } from 'src/app/about/about.component';
import { RegistrationComponent } from 'src/app/registration/registration.component';
import { CoronatrackerComponent } from './coronatracker/coronatracker.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  { path: 'about', component: AboutComponent },
  { path: 'registration', component: RegistrationComponent },
  { path: 'login', component: LoginComponent },
  { path: 'coronatracker', component: CoronatrackerComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
