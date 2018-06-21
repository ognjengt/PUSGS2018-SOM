import { Component, OnInit } from '@angular/core';
import { RentService } from '../../../services/rent/rent.service';
import { VehicleModule } from '../../../models/vehicle.model';
import { ServiceModule } from '../../../models/service.model';
import { ServiceService } from '../../../services/serv/service.service';
import { VehicleTypeService } from '../../../services/vehicle-type/vehicle-type.service';
import { VehicleValidations } from '../../../models/validations/validationModels';
import { FileUploadService } from '../../../services/file-upload/file-upload.service';


@Component({
  selector: 'app-add-rent',
  templateUrl: './add-rent.component.html',
  styleUrls: ['./add-rent.component.css']
})
export class AddRentComponent implements OnInit {

  services: any = [];
  types: any = [];
  validations: VehicleValidations = new VehicleValidations();
  logo: any;

  constructor(private serviceService: ServiceService, private rentService: RentService, private vehicleTypeService: VehicleTypeService, private fileUploadService: FileUploadService) { 
    serviceService.getServices().subscribe(data => {
      this.services = data;
    })
    vehicleTypeService.getTypes().subscribe(data => {
      this.types = data;
    })
  }

  onFileSelected(event){
    this.logo = event.target.files;
  }

  ngOnInit() {
  }

  onSubmit(vehicleFormData, vehicleForm) {

    if(this.validations.validate(vehicleFormData)) return;
    
    this.rentService.addVehicle(vehicleFormData).subscribe(response => {
      if (this.logo != undefined){
        this.fileUploadService.uploadVehicleImages(response.toString(), this.logo)
        .subscribe(data => {   
          alert("Add was successful!");   
        })
      }
      else{        
        alert("Add was successful!");  
      }  
    })
  }
}
