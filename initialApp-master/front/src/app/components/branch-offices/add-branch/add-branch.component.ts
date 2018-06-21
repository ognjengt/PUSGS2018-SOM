import { Component, OnInit } from '@angular/core';
import { BranchofficeService } from '../../../services/branchoffices/branchoffice.service';
import { ServiceModule } from '../../../models/service.model';
import { BranchValidations } from '../../../models/validations/validationModels';
import { FileUploadService } from '../../../services/file-upload/file-upload.service';

@Component({
  selector: 'app-add-branch',
  templateUrl: './add-branch.component.html',
  styleUrls: ['./add-branch.component.css'],
  providers: [BranchofficeService]
})
export class AddBranchComponent implements OnInit {
  
  services: ServiceModule[] = [];
  validations: BranchValidations = new BranchValidations();
  selectedImages: any;

  constructor(private branchOfficeService: BranchofficeService, private fileUploadService: FileUploadService) { 
    branchOfficeService.getAllServices().subscribe(data => {
      this.services = data;
    })
  }

  ngOnInit() {
  }

  onFileSelected(event){
    this.selectedImages = event.target.files;
  }

  onSubmit(branchFormData, branchForm) {

    if(this.validations.validate(branchFormData)) return;

    this.branchOfficeService.postBranchOffice(branchFormData).subscribe(response => {
      console.log(response);
      if (this.selectedImages != undefined){
        this.fileUploadService.uploadBranchLogo(response, this.selectedImages)
        .subscribe(data => {   
          alert("Add was successful!");   
        }, 
        error => {
          alert("Image not added, too large!");  
        })
      }
      else{        
        alert("Add was successful!");  
      }  
    })
  }
}
