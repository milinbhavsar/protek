import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {DashboardComponent} from './dashboard/dashboard.component';
import {LoginComponent} from './login/login.component';
import {AuthGuard} from './auth/auth.guard';
import {HomeComponent} from './home/home.component';
import {TimesheetsComponent} from './timesheets/timesheets.component';
import {TimesheetsResolve} from './timesheets/timesheets.resolve';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [AuthGuard],
    children: [
      { path: 'dashboard' , component: DashboardComponent },
      { path: 'timesheets' , component: TimesheetsComponent, resolve: { timesheets: TimesheetsResolve } },
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
    ]
  },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '**', redirectTo: '' } // otherwise redirect to home
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
