import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthService} from '../auth/auth.service';
import {MatDialog} from '@angular/material';
import {ErrorDialogComponent} from '../error-dialog/error-dialog.component';

@Component({
  // selector: 'sr-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  hidePass = true;
  returnUrl: string;
  loading = false;
  formSubmitAttempt = false;

  constructor(
    private authService: AuthService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      pwd: ['', [Validators.required, Validators.minLength(2)]]
    });

    // reset login status
    this.authService.logout();

    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  login() {
    this.formSubmitAttempt = true;
    if (this.form.valid) {
      this.loading = true;
      this.authService.login(this.form.value, this.returnUrl)
        .subscribe((data) => {
            this.loading = false;
          },
          errorObj => {
            // this.alertService.error(error);
            this.loading = false;
            this.openDialog(errorObj.error);
          });
    }
  }

  openDialog(error): void {
    const dialogRef = this.dialog.open(ErrorDialogComponent, {
      width: '500px',
      data: error
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }

  isFieldInvalid(field: string) {
    return (
      (!this.form.get(field).valid && this.form.get(field).touched) ||
      (this.form.get(field).untouched && this.formSubmitAttempt)
    );
  }
}
