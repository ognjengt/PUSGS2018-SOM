import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../../../services/serv/service.service';
import { ServiceModule } from '../../../models/service.model';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-edit-service',
  templateUrl: './edit-service.component.html',
  styleUrls: ['./edit-service.component.css'],
  providers: [ServiceService]
})
export class EditServiceComponent implements OnInit {

  service:any
  id:any

  constructor(private servService: ServiceService, private route: ActivatedRoute, private router: Router) {
  }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.id = params['Id'];
    });
    this.service = this.servService.getService(this.id).
    subscribe(data => {
      this.service = data
      console.log(this.service)
    })
  }

  onSubmit(editServiceData: ServiceModule, form: NgForm) {
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
