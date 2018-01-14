import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Timesheet} from '../shared/timesheet';
import {Observable} from 'rxjs/Observable';
import {TimesheetsService} from '../shared/timesheets.service';

@Injectable()
export class TimesheetsResolve implements Resolve<Timesheet[]> {

  constructor(private timesheetsService: TimesheetsService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Timesheet[]> | Promise<Timesheet[]> | Timesheet[] {
    return this.timesheetsService.getAll();
  }

}
