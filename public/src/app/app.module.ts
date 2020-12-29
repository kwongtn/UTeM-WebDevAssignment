import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';

import { HttpClientModule } from '@angular/common/http';
import { NgxChartsModule } from '@swimlane/ngx-charts';

// Angular CDK Components
import { LayoutModule } from '@angular/cdk/layout';
import { DragDropModule } from '@angular/cdk/drag-drop';

// Material Design Components
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { MatTabsModule } from '@angular/material/tabs';
import { MatListModule } from '@angular/material/list';

// Defined Components
import { AboutTeamComponent } from './about/team/about-team.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RegistrationComponent } from './registration/registration.component';
import { LoginComponent } from './login/login.component';
import { TechStackComponent } from './about/tech-stack/tech-stack.component';
import { AboutComponent } from './about/about.component';
import { CoronatrackerComponent } from './coronatracker/coronatracker.component';
import { WorldwideHistoryComponent } from './coronatracker/worldwide-history/worldwide-history.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { DailyCasesComponent } from './coronatracker/daily-cases/daily-cases.component';
import { TopCasesComponent } from './coronatracker/top-cases/top-cases.component';
import { HomeComponent } from './home/home.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ChatboxComponent } from './home/chatbox/chatbox.component';

@NgModule({
  declarations: [
    AppComponent,
    AboutTeamComponent,
    DashboardComponent,
    RegistrationComponent,
    LoginComponent,
    TechStackComponent,
    AboutComponent,
    CoronatrackerComponent,
    WorldwideHistoryComponent,
    DailyCasesComponent,
    TopCasesComponent,
    HomeComponent,
    PageNotFoundComponent,
    ChatboxComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatButtonModule,
    MatGridListModule,
    MatCardModule,
    MatMenuModule,
    MatIconModule,
    LayoutModule,
    MatInputModule,
    MatSelectModule,
    MatRadioModule,
    MatTabsModule,
    MatListModule,
    ReactiveFormsModule,
    NgxChartsModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    DragDropModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
