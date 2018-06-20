import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../../services/auth/authentication-service.service';
import { AuthenticationModule } from '../../../models/registration.model';
import { NgForm } from '@angular/forms';
import { SignInValidations } from '../../../models/validations/validationModels';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css'],
  providers: [AuthenticationService]
})
export class SignInComponent implements OnInit {

  validations: SignInValidations = new SignInValidations();

  constructor(private authService: AuthenticationService) { }

  ngOnInit() {
  }

  onSubmit(loginData: AuthenticationModule, form: NgForm) {
    //console.log(loginData);
    if(this.validations.validate(loginData)) return;


    this.authService.login(loginData).subscribe(
      res => {
        console.log(res.access_token);
        
        let jwt = res.access_token;

        let jwtData = jwt.split('.')[1]
        let decodedJwtJsonData = window.atob(jwtData)
        let decodedJwtData = JSON.parse(decodedJwtJsonData)

        let role = decodedJwtData.role

        console.log('jwtData: ' + jwtData)
        console.log('decodedJwtJsonData: ' + decodedJwtJsonData)
        console.log(decodedJwtData)
        console.log('Role ' + role)

        localStorage.setItem('jwt', jwt)
        localStorage.setItem('role', role);
        window.location.href = "/home"; // ovo verovatno ce morati da se radi kroz komponentu, sto znaci da ova funkcija mora da vrati neku vrednost, tipa da vrati uspesno ulogovan ili neuspesno
      },
      err => {
        alert('Invalid credentials');
      }
    );
  }
}
