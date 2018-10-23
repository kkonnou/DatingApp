import { UserService } from 'src/app/_Services/user.service';
import { Component, OnInit, Input } from '@angular/core';
import { User } from '../../_models/user';
import { AuthService } from 'src/app/_Services/auth.service';
import { AlertifyService } from 'src/app/_Services/alertify.service';


@Component({
  selector: 'app-member-card',
  templateUrl: './member-card.component.html',
  styleUrls: ['./member-card.component.css']
})
export class MemberCardComponent implements OnInit {
@Input() user: User; // pass the user in

constructor(private authService: AuthService, private userService: UserService, private alertify: AlertifyService) { }

ngOnInit() {
}

sendLike(id: number) {
  this.userService.sendLike(this.authService.decodedToken.nameid, id).subscribe(data => {
    this.alertify.success('You have liked: ' + this.user.knownAs);
  }, error => {
    this.alertify.error(error);
  });
}

}
