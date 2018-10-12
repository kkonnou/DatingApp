import { Component, OnInit, ViewChild, HostListener } from '@angular/core';
import { User } from '../../_models/user';
import { ActivatedRoute } from '@angular/router';
import { AlertifyService } from '../../_Services/alertify.service';
import { NgForm } from '@angular/forms';
import { UserService } from '../../_Services/user.service';
import { AuthService } from '../../_Services/auth.service';

@Component({
  selector: 'app-member-edit',
  templateUrl: './member-edit.component.html',
  styleUrls: ['./member-edit.component.css']
})
export class MemberEditComponent implements OnInit {
  @ViewChild('editForm') editForm: NgForm;
  user: User;

  @HostListener('window:beforeunload', ['$event'])
  unloadNotification($event: any) {
    if (this.editForm.dirty) {
      $event.returnValue = true;
    }
  }

  constructor(private route: ActivatedRoute, private alertify: AlertifyService,
    private userService: UserService, private authService: AuthService) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.user = data['user'];
    });
  }

  updateUser() {
    console.log('TokenID: ' + this.authService.decodedToken.nameid );
   // this.userService.updateUser(this.authService.decodedToken.nameid, this.user).subscribe(next => {
   this.userService.updateUser(this.user.id, this.user).subscribe(next => {
      this.editForm.reset(this.user);
      this.alertify.success('Profile updated succesfully');
    }, error => {
      console.log(error);
      this.alertify.error(error);
    });
  }


}
