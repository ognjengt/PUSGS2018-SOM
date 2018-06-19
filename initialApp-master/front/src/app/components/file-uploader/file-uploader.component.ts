import { Component, OnInit } from '@angular/core';
import { FileUploadService } from '../../services/file-upload/file-upload.service';

@Component({
  selector: 'app-file-uploader',
  templateUrl: './file-uploader.component.html',
  styleUrls: ['./file-uploader.component.css']
})
export class FileUploaderComponent implements OnInit {

  selectedImage : File = null;

  constructor(private fileUploadService: FileUploadService) { }

  ngOnInit() {
  }

  onFileSelected(event){
    this.selectedImage = event.target.files[0];
  }

  onUpload(){
    this.fileUploadService.uploadFile(this.selectedImage)
    .subscribe(data => {
      console.log(data)
    })
  }
}
