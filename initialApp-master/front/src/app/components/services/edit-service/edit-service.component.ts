import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../../../services/serv/service.service';
import { ServiceModule } from '../../../models/service.model';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ServiceValidations } from '../../../models/validations/validationModels';

@Component({
  selector: 'app-edit-service',
  templateUrl: './edit-service.component.html',
  styleUrls: ['./edit-service.component.css'],
  providers: [ServiceService]
})
export class EditServiceComponent implements OnInit {

  service:any
  id:any

  validations: ServiceValidations = new ServiceValidations();

  constructor(private servService: ServiceService, private route: ActivatedRoute, private router: Router) {
  }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.id = params['Id'];

        this.service = this.servService.getService(this.id).
          subscribe(data => {
            this.service = data
            console.log(this.service)
         })
    });
    
  }

  onSubmit(editServiceData: ServiceModule, form: NgForm) {
    if(this.validations.validate(editServiceData)) return;
    
    editServiceData.Id = this.id  
    this.servService.editService(this.id, editServiceData)
    .subscribe( data => {
      alert("Edit was successful!");
    },
    error => {
      alert("Error!");
    })
  }
}
