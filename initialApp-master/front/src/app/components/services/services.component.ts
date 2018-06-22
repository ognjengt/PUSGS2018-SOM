import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../../services/serv/service.service';
import decode from 'jwt-decode';


@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.css'],
  providers: [ServiceService]
})
export class ServicesComponent implements OnInit {

  services : any = []

  constructor(private servService: ServiceService) {
    this.servService.getServices().
    subscribe(data => {
      this.services = data
    })
  }

  deleteService(id, i){
    this.servService.deleteService(id).
    subscribe(data => {      
      alert("Delete successful!")
      this.services.splice(i, 1)
    })
  }

  ngOnInit() {
  }
  
  loggedIn(): string {
    return localStorage.jwt;
  }

  isAuthorized() {
    const tokenPayload = decode(localStorage.getItem('jwt'));
    if(tokenPayload.role != 'Admin') {
      if(tokenPayload.role != 'Manager') {
        return false;
      }
      else return true;
    }
    else return true;
  }

  // Todo pogledati ko moze da dodaje servise
}
