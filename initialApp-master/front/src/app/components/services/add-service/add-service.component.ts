import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../../../services/serv/service.service';
import { AuthenticationModule } from '../../../models/registration.model';
import { NgForm } from '@angular/forms';
import { HttpHeaders } from '@angular/common/http';
import { ServiceModule } from '../../../models/service.model';

@Component({
  selector: 'app-add-service',
  templateUrl: './add-service.component.html',
  styleUrls: ['./add-service.component.css'],
  providers: [ServiceService]
})
export class AddServiceComponent implements OnInit {

  constructor(private servService: ServiceService) { }

  ngOnInit() {
  }

  onSubmit(addServiceData: ServiceModule, form: NgForm) {  
    this.servService.addService(addServiceData)
    .subscribe( data => {
      alert("Add was successful!");
    },
    error => {
      alert("Error!");
    })
  }
}
