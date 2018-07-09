import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
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
  userBytesImage: any;
  //@ViewChild('uim') uim: ElementRef;

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
        this.usersService.getUserImage(claims['Email']).subscribe(imageBytes => {
          //this.uim.nativeElement.src = "data:image/jpg;base64," + imageBytes;
          this.userBytesImage = "data:image/png;base64," + imageBytes;
          console.log(this.userBytesImage)
          this.profileLoaded = true
          this.user = data;
          console.log(this.user);          
        })
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
    }, 
    error => {
      alert("Image not added, too large!");  
      this.requestUserInfo()
    })
  }
}
