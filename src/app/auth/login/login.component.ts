import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  data: {
    username?: string;
    password?: string;
  };

  constructor(private authService: AuthenticationService) {
    this.data = {};
  }

  ngOnInit() {
  }

  login(): void {

    // $('#login-button').button('loading');

    this.authService.login({
      data: {
        email: this.data.username,
        password: this.data.password
      },
      onSuccess: (response) => {
        this.authService.setAccessToken(response.headers.get('x-auth-token'));

        this.authService.redirectAfterLogin();
      },
      onError: (response) => {
        this.data.password = '';
        // $('#login-button').button('reset');
      }
    });
  }


}
