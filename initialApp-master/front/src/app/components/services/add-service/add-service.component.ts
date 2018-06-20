import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../../../services/serv/service.service';
import { AuthenticationModule } from '../../../models/registration.model';
import { NgForm } from '@angular/forms';
import { HttpHeaders } from '@angular/common/http';
import { ServiceModule } from '../../../models/service.model';
import { FileUploadService } from '../../../services/file-upload/file-upload.service';

@Component({
  selector: 'app-add-service',
  templateUrl: './add-service.component.html',
  styleUrls: ['./add-service.component.css'],
  providers: [ServiceService]
})
export class AddServiceComponent implements OnInit {

  logo: any;

  constructor(private servService: ServiceService, private fileUploadService: FileUploadService) { }

  ngOnInit() {
  }
  
  onFileSelected(event){
    this.logo = event.target.files;
  }

  onSubmit(addServiceData: ServiceModule, form: NgForm) { 
    this.servService.addService(addServiceData)
    .subscribe( data => {
      if (this.logo != undefined){
        this.fileUploadService.uploadServiceLogo(addServiceData.Email, this.logo)
        .subscribe(data => {   
          alert("Add was successful!");   
        })
      }
      else{        
        alert("Add was successful!");  
      }  
    },
    error => {
      alert("Error!");
    })  
  }
}
