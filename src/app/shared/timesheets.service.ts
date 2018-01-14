import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {Timesheet} from './timesheet';
import {AuthService} from '../auth/auth.service';

@Injectable()
export class TimesheetsService {

  constructor(private http: HttpClient, private authService: AuthService) { }

  getAll(): Observable<Timesheet[]> {
    const url = '/API/getalltimesheets';
    return this.http.post<Timesheet[]>('/API/getalltimesheets', {user_id: this.authService.getUserId() });
  }

  submit(submitData): Observable<Timesheet[]> {
    const url = '/API/getalltimesheets';
    return this.http.post<Timesheet[]>('/API/posttimesheet', submitData);
  }

}
