import { Component } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent {
  
  name = sessionStorage.getItem('username') ? `, ${sessionStorage.getItem('username')}` : '';
  
  constructor(public _authService: AuthService) {
    _authService.getLoggedInInfo.subscribe(info => this.name = info.username);
  }
}
