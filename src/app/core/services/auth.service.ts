import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { NotificationService } from './notification.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private router: Router, private _notificationService: NotificationService) { }

  private authStatusListener = new Subject<boolean>();
  getLoggedInInfo = new Subject<{ username: string }>();
  tokenTimer: any;

  login(data: { username: string, password: string }) {
    if(data.username === 'admin' && data.password === 'admin') {
      this.tokenTimer = setTimeout(() => {
        this.logout();
        this._notificationService.notification$.next({ message: 'Session Timeout !! Login Again', action: 'ERROR', panelClass: 'danger' });
      }, 5*60*60*1000);
      this.authStatusListener.next(true);
      this.saveAuthData(data.username, new Date(new Date().getTime() + 5*60*60*1000));
      this.getLoggedInInfo.next({ username: `, ${sessionStorage.getItem('username')}` });
      this.router.navigate(['view']);
    } else { alert('Invalid username/password') }
  }

  isUserLoggedIn() {
    return !(sessionStorage.getItem('username')===null);
  }

  logout() {
    sessionStorage.clear();
    this.authStatusListener.next(false);
    this.getLoggedInInfo.next({ username: '' });
    clearTimeout(this.tokenTimer);
    this.router.navigate(['login']);
  }

  private saveAuthData(userName: string, expireTime: Date) {
    sessionStorage.setItem('username', userName);
    sessionStorage.setItem('expireTime', expireTime.toISOString());
  }
}
