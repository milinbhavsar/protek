import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import {AngularFontAwesomeModule} from 'angular-font-awesome';
import {MaterialModule} from './material/material.module';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { AuthGuard } from './auth/auth.guard';
import { AuthService } from './auth/auth.service';
import { HeaderComponent } from './header/header.component';
import { ErrorDialogComponent } from './error-dialog/error-dialog.component';
import { HomeComponent } from './home/home.component';
import { TimesheetsComponent } from './timesheets/timesheets.component';
import {TimesheetsService} from './shared/timesheets.service';
import {TimesheetsResolve} from './timesheets/timesheets.resolve';
import {MomentModule} from 'angular2-moment';
import { TimesheetComponent } from './timesheet/timesheet.component';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    HeaderComponent,
    ErrorDialogComponent,
    HomeComponent,
    TimesheetsComponent,
    TimesheetComponent,
    ConfirmDialogComponent
  ],
  imports: [
    BrowserModule,
    AngularFontAwesomeModule,
    AppRoutingModule,
    MaterialModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MomentModule
  ],
  providers: [
    AuthGuard,
    AuthService,
    TimesheetsService,
    TimesheetsResolve
  ],
  entryComponents: [
    ErrorDialogComponent,
    TimesheetComponent,
    ConfirmDialogComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
