import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {User} from './user';
import {HttpClient} from '@angular/common/http';
import 'rxjs/add/operator/map';
import {Router} from '@angular/router';

@Injectable()
export class AuthService {

  constructor(private http: HttpClient, private router: Router) { }

  login(body: {email: string, pwd: string}, url: string) {
    return this.http.post<User>('/API/login', body)
      .map((data) => {
        window.localStorage.setItem('currentUser', JSON.stringify(data));
        this.router.navigate([url]);
      });
  }

  logout() {
    window.localStorage.removeItem('currentUser');
  }

  getUser(): User {
    const user = window.localStorage.getItem('currentUser');
    if (user) {
      try {
        return JSON.parse(user);
      } catch (e) {
      }
    }
    return null;
  }

}
