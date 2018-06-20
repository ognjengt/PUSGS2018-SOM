import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../services/users/users.service';
import { FileUploadService } from '../../services/file-upload/file-upload.service';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  providers: [UsersService]
})
export class ProfileComponent implements OnInit {

  profileLoaded: boolean;
  user: any;
  selectedImage: any;

  constructor(private usersService: UsersService, private fileUploadService: FileUploadService) {
    this.requestUserInfo()
   }

  ngOnInit() {
  }  

  getRole(): string {
    return localStorage.role;
  }
  
  requestUserInfo(){
    this.usersService.getUserClaims().subscribe(claims => {
      this.usersService.getUserData(claims['Email']).subscribe(data => {
        this.profileLoaded = true
        this.user = data;
      })
    })
  }
  
  onFileSelected(event){
    this.selectedImage = event.target.files;
  }

  onUpload(){    
    if (this.selectedImage == undefined){
      alert("No image selected!");
      return; 
    }
    this.fileUploadService.uploadFile(this.selectedImage)
    .subscribe(data => {      
      alert("Image uploaded.");      
      this.requestUserInfo()
    })
  }
}
