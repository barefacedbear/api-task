import { Component } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent {

  constructor(private _authService: AuthService) { }

  form = { username: '', password: '' };
  login = () => this._authService.login(this.form);
}
