import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../../../services/serv/service.service';
import { AuthenticationModule } from '../../../models/registration.model';
import { NgForm } from '@angular/forms';
import { HttpHeaders } from '@angular/common/http';
import { ServiceModule } from '../../../models/service.model';
import { ServiceValidations } from '../../../models/validations/validationModels';

@Component({
  selector: 'app-add-service',
  templateUrl: './add-service.component.html',
  styleUrls: ['./add-service.component.css'],
  providers: [ServiceService]
})
export class AddServiceComponent implements OnInit {

  validations: ServiceValidations = new ServiceValidations();

  constructor(private servService: ServiceService) { }

  ngOnInit() {
  }

  onSubmit(addServiceData: ServiceModule, form: NgForm) {  

    if(this.validations.validate(addServiceData)) return;

    this.servService.addService(addServiceData)
    .subscribe( data => {
      alert("Add was successful!");
    },
    error => {
      alert("Error!");
    })
  }
}
