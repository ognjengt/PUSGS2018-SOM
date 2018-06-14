import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../../services/auth/authentication-service.service';
import { AuthenticationModule } from '../../../models/registration.model';
import { NgForm } from '@angular/forms';
import { HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers: [AuthenticationService]
})
export class RegisterComponent implements OnInit {

  constructor(private authService: AuthenticationService) { 
  }

  ngOnInit() {
  }


  onSubmit(registrationData: AuthenticationModule, form: NgForm) {
    console.log(registrationData);

    // Todo call Service and send register request
    this.authService.register(registrationData)
    .subscribe( data => {
      alert("Register successful!");
    },
    error => {
      alert("Error!");
    })
  }
  
}
