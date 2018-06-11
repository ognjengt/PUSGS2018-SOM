import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../../services/auth/authentication-service.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css'],
  providers: [AuthenticationService]
})
export class SignInComponent implements OnInit {

  constructor(private authService: AuthenticationService) { }

  ngOnInit() {
  }


  // Todo implement
}
