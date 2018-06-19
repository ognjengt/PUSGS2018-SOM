import { Component, OnInit } from '@angular/core';
import { FileUploadService } from '../../services/file-upload/file-upload.service';

@Component({
  selector: 'app-file-uploader',
  templateUrl: './file-uploader.component.html',
  styleUrls: ['./file-uploader.component.css']
})
export class FileUploaderComponent implements OnInit {

  selectedImages : File[] = [];

  constructor(private fileUploadService: FileUploadService) { }

  ngOnInit() {
  }

  onFileSelected(event){
    this.selectedImages = event.target.files;
  }

  onUpload(){
    this.fileUploadService.uploadFile(this.selectedImages)
    .subscribe(data => {
    })
  }
}
