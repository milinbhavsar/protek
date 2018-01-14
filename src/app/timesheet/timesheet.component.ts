import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef, MatSnackBar} from '@angular/material';
import {Moment} from 'moment';
import {AuthService} from '../auth/auth.service';
import * as moment from 'moment';
import {ConfirmDialogComponent} from '../confirm-dialog/confirm-dialog.component';
import {TimesheetsService} from '../shared/timesheets.service';

@Component({
  selector: 'sr-timesheet',
  templateUrl: './timesheet.component.html',
  styleUrls: ['./timesheet.component.scss']
})
export class TimesheetComponent implements OnInit {
  form: FormGroup;
  startDate: Moment;
  endDate: Moment;
  week: {
    Sunday: Moment,
    Monday: Moment,
    Tuesday: Moment,
    Wednesday: Moment,
    Thursday: Moment,
    Friday: Moment,
    Saturday: Moment,
  };


  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    public dialogRef: MatDialogRef<TimesheetComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialog: MatDialog,
    private timesheetsService: TimesheetsService,
    public snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this.startDate = moment(this.data.startDate);
    this.endDate = moment(this.data.startDate).add(6, 'day');
    this.week = {
      Sunday:  moment(this.startDate).add(0, 'day'),
      Monday: moment(this.startDate).add(1, 'day'),
      Tuesday: moment(this.startDate).add(2, 'day'),
      Wednesday: moment(this.startDate).add(3, 'day'),
      Thursday: moment(this.startDate).add(4, 'day'),
      Friday: moment(this.startDate).add(5, 'day'),
      Saturday: moment(this.startDate).add(6, 'day'),
    };

    this.form = this.fb.group({
      projectName: this.data.projectName || '',
      Sunday: '',
      Monday: '',
      Tuesday: '',
      Wednesday: '',
      Thursday: '',
      Friday: '',
      Saturday: '',
      Total: ''
    });
  }

  submit() {
    const submitData = {
      submit : 'true',
      startdate: this.startDate.format('YYYY-M-D'),
      enddate: this.endDate.format('YYYY-M-D'),
      user_id: this.authService.getUserId(),
      working_hours: this.getTotal(),
      projname: this.form.value.projectName,
      Sunday:  +this.form.value.Sunday + ',' + this.week.Sunday.format('YYYY-M-D'),
      Monday: +this.form.value.Monday + ',' + this.week.Monday.format('YYYY-M-D'),
      Tuesday: +this.form.value.Tuesday + ',' + this.week.Tuesday.format('YYYY-M-D'),
      Wednesday: +this.form.value.Wednesday + ',' + this.week.Wednesday.format('YYYY-M-D'),
      Thursday: +this.form.value.Thursday + ',' + this.week.Thursday.format('YYYY-M-D'),
      Friday: +this.form.value.Friday + ',' + this.week.Friday.format('YYYY-M-D'),
      Saturday: +this.form.value.Saturday + ',' + this.week.Saturday.format('YYYY-M-D'),
    };
    console.log('submitData');
    console.log(submitData);

    const confirmDialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '500px',
      data: {
        title: 'Please Confirm',
        body: 'Total Hours: ' + submitData.working_hours,
        cancelButtonText: 'Cancel',
        confirmButtonText: 'Submit'
      }
    });

    confirmDialogRef.afterClosed().subscribe(result => {
      if (result) { // submit
        this.timesheetsService.submit(submitData).subscribe(
          (data) => {
            this.openSnackBar('Done', 'Ok', 3000);
            this.dialogRef.close(submitData);
          },
          (error) => {
            this.openSnackBar('Unable to submit to protek', 'Ok');
          }
        );
      }
    });

  }

  openSnackBar(message: string, action: string, duration?: number) {
    if (duration) {
      this.snackBar.open(message, action, {
        duration: duration,
      });
    } else {
      this.snackBar.open(message, action);
    }
  }

  getTotal(): number {
    return +this.form.value.Sunday +
      this.form.value.Monday +
      this.form.value.Tuesday +
      this.form.value.Wednesday +
      this.form.value.Thursday +
      this.form.value.Friday +
      this.form.value.Saturday;
  }

  cancel(): void {
    this.dialogRef.close();
  }

  load40() {
    this.form.patchValue({
      Sunday: 0,
      Monday: 8,
      Tuesday: 8,
      Wednesday: 8,
      Thursday: 8,
      Friday: 8,
      Saturday: 0
    });
  }

}
