import { AuthService } from './../../_Services/auth.service';
import { AlertifyService } from './../../_Services/alertify.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, ViewChild, HostListener} from '@angular/core';
import { User } from 'src/app/_models/user';
import { NgForm } from '@angular/forms';
import { UserService } from 'src/app/_Services/user.service';

@Component({
  selector: 'app-member-edit',
  templateUrl: './member-edit.component.html',
  styleUrls: ['./member-edit.component.css']
})
export class MemberEditComponent implements OnInit {
  @ViewChild('editForm') editForm: NgForm; // required for form reset
  user: User;

  // this is to send a message before closing the browser or the windows
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
    this.userService.updateUser(this.authService.decodedToken.nameid, this.user).subscribe(next => {
      this.alertify.success('Profile updated successfully');
      this.editForm.reset(this.user);
    }, error => {
      this.alertify.error(error);
    });
  }

}
