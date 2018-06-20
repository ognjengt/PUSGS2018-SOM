import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../../services/auth/authentication-service.service';
import { AuthenticationModule } from '../../../models/registration.model';
import { NgForm } from '@angular/forms';
import { HttpHeaders } from '@angular/common/http';
import { RegistrationValidations } from '../../../models/validations/validationModels';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers: [AuthenticationService]
})
export class RegisterComponent implements OnInit {

  validations: RegistrationValidations = new RegistrationValidations();

  constructor(private authService: AuthenticationService) { 
  }

  ngOnInit() {
  }

  
  onSubmit(registrationData: AuthenticationModule, form: NgForm) {

    if(this.validations.validate(registrationData)) return;
    console.log(registrationData);
    
    if(this.confirmPassword(registrationData.Password, registrationData.ConfirmPassword) === false) {
      alert("Passwords do not match!");
      return;
    }

    this.authService.register(registrationData)
    .subscribe( data => {
      alert("Register successful!");
    },
    error => {
      alert("Error!");
    })
  }

  confirmPassword(password1: string, password2: string) {
    if(password1 !== password2) return false;
    else return true;
  }
  
}
