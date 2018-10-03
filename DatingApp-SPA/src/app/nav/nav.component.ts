import { AlertifyService } from './../_Services/alertify.service';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_Services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  model: any = {};

  constructor(public authService: AuthService, private alertify: AlertifyService,
     private router: Router) { }

  ngOnInit() {
  }

  login() {
    this.authService.login(this.model).subscribe(next => {
      this.alertify.success('Logged in successfully');
      console.log('Logged in successfully');
    }, error => {
      this.alertify.error(error);
      console.log('Failed to login');
      console.log(error);
    }, () => {
      this.router.navigate(['/members']);
    });
  }

  loggedIn() {
    return this.authService.loggedIn();
  }

  logout() {
    localStorage.removeItem('token');
    this.alertify.message('Logged out successfully');
    console.log('logged out');
    this.router.navigate(['/home']);
  }

}
