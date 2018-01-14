import { Component, OnInit } from '@angular/core';
import {Timesheet} from '../shared/timesheet';
import {ActivatedRoute} from '@angular/router';
import {AuthService} from '../auth/auth.service';
import {User} from '../auth/user';
import {Moment} from 'moment';
import {MatDialog} from '@angular/material';
import {TimesheetComponent} from '../timesheet/timesheet.component';
import * as moment from 'moment';

@Component({
  // selector: 'sr-timesheets',
  templateUrl: './timesheets.component.html',
  styleUrls: ['./timesheets.component.scss']
})
export class TimesheetsComponent implements OnInit {
  timesheets: Timesheet[];
  allTime: SingleTimeSheet[];
  user: User;

  startDate: Moment;
  currentDate: Moment;

  projectName: string;

  constructor(
    private route: ActivatedRoute,
    private authService: AuthService,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    this.timesheets = this.route.snapshot.data['timesheets'];
    this.user = this.authService.getUser();

    this.startDate = moment(this.user.start_date);
    this.currentDate = moment();

    this.createTimeSheets();
  }

  createTimeSheets() {
    this.allTime = [];
    let weekStart = moment().startOf('week');
    let weekEnd = moment().endOf('week');

    while (weekEnd > this.startDate) {
      const timesheet = this.getProtekTimeSheetForWeek(weekEnd);
      this.allTime.push({
        startDate: moment(weekStart),
        endDate: moment(weekEnd),
        isPending: !timesheet,
        protekTimesheet: timesheet
      });
      weekStart = weekStart.add(-7, 'days');
      weekEnd = weekEnd.add(-7, 'days');
    }
  }

  getProtekTimeSheetForWeek(endDate: Moment): Timesheet {
    if (this.timesheets && this.timesheets.length && this.timesheets.length > 0) {
      const isSameWeek = moment(this.timesheets[this.timesheets.length - 1].end_date, 'YYYY-MM-DD').isSame(endDate, 'day');
      if (isSameWeek) {
        const timeSheet = this.timesheets.pop();
        if (timeSheet.projname && !this.projectName) {
          this.projectName = timeSheet.projname;
        }
        // take most recent value and remove duplicates
        this.removeDuplicates(timeSheet);
        return timeSheet;
      }
    }
    return null;
  }

  removeDuplicates(removedTimesheet: Timesheet) {
    const lastEndDate = moment(removedTimesheet.end_date, 'YYYY-MM-DD');
    while (
      this.timesheets.length > 0
      && moment(this.timesheets[this.timesheets.length - 1].end_date, 'YYYY-MM-DD').isSame(lastEndDate, 'day')) {
      console.log('removed duplicate');
      this.timesheets.pop();
    }
  }

  addTime(startDate: Moment, index: number) {
    const dialogRef = this.dialog.open(TimesheetComponent, {
      width: '900px',
      data: { startDate: startDate, projectName: this.projectName || '' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.allTime[index].isPending = false;
        this.allTime[index].protekTimesheet = result;
      }
      console.log('The dialog was closed');
      // this.animal = result;
    });
  }
}

export interface SingleTimeSheet {
  startDate: Moment;
  endDate: Moment;
  isPending: boolean;
  protekTimesheet ?: Timesheet;
}
