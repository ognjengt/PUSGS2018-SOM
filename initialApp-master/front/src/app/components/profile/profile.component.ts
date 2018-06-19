import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../services/users/users.service';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  providers: [UsersService]
})
export class ProfileComponent implements OnInit {

  user: any;

  constructor(private usersService: UsersService) {
    usersService.getUserClaims().subscribe(claims => {
      usersService.getUserData(claims['Email']).subscribe(data => {
        this.user = data;
      })
    })
   }

  ngOnInit() {
  }

}
