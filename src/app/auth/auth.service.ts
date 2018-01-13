import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {User} from './user';
import {HttpClient} from '@angular/common/http';
import 'rxjs/add/operator/map';
import {Router} from '@angular/router';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';

@Injectable()
export class AuthService {
  private loggedIn = new BehaviorSubject<boolean>(this.checkLogin());

  get isLoggedIn() {
    console.log('loggedIn'+ this.loggedIn.getValue());
    return this.loggedIn.asObservable(); // {2}
  }

  checkLogin(): boolean {
    const user = window.localStorage.getItem('currentUser');
    if (user) {
      try {
        if (JSON.parse(user).user_name) {
          return true;
        }
      } catch (e) {
      }
    }
    return false;
  }


  constructor(private http: HttpClient, private router: Router) { }

  login(body: {email: string, pwd: string}, url: string) {
    return this.http.post<User>('/API/login', body)
      .map((data) => {
        this.loggedIn.next(true);
        window.localStorage.setItem('currentUser', JSON.stringify(data));
        this.router.navigate([url]);
      });
  }


  logout() {
    window.localStorage.removeItem('currentUser');
    this.loggedIn.next(false);
    // this.router.navigate(['/login']);
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
