import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from '../services/auth.service';
import {Router} from '@angular/router';
import * as $ from 'Jquery';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  data: {
    username?: string;
    password?: string;
  };

  constructor(private authService: AuthenticationService,
              private router: Router) {
    this.data = {};
  }

  ngOnInit() {
  }

  login(): void {

    $('#login-button').button('loading');

    this.authService.register({
      data: {
        email: this.data.username,
        password: this.data.password
      },
      onSuccess: (response) => {
        this.router.navigate(['auth/login']);
      },
      onError: (response) => {
        this.data.password = '';
        // $('#login-button').button('reset');
      }
    });
  }
}
