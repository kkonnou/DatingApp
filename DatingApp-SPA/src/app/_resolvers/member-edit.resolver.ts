import { AuthService } from './../_Services/auth.service';
import { catchError } from 'rxjs/operators';
import { User } from '../_models/user';
import { AlertifyService } from '../_Services/alertify.service';
import { UserService } from '../_Services/user.service';
import { Injectable } from '@angular/core';
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';

@Injectable()
export class MemberEditResolver implements Resolve<User> {
  constructor (private userService: UserService,
    private authServive: AuthService,
    private router: Router,
    private alertfiy: AlertifyService) {}

resolve(route: ActivatedRouteSnapshot): Observable<User> {
return this.userService.getUser(this.authServive.decodedToken.nameid)
    .pipe(
        catchError(error => {
            this.alertfiy.error('Problem retrieving your data: ' + error);
            this.router.navigate(['/members']);
            return of(null);
        })
    );
}
}

