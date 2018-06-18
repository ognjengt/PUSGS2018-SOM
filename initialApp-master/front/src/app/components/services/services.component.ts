import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../../services/serv/service.service';


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

  ngOnInit() {
  }


  // Todo pogledati ko moze da dodaje servise
}
