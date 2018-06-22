import { Component, OnInit, NgZone, ViewContainerRef } from '@angular/core';
import { SignalRServiceService } from '../app/services/signal-r-service/signal-r-service.service';
import { GetNotification } from '../app/models/GetNotification';  
import { ToastrService } from 'ngx-toastr';
import decode from 'jwt-decode'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [SignalRServiceService]
})
export class AppComponent {
  title = 'app'; 

  public currentMessage: GetNotification;  
  public allMessages: any;  
  public canSendMessage: Boolean; 

  constructor(private _signalRService: SignalRServiceService, private _ngZone: NgZone, private toastr: ToastrService) {    
      this.subscribeToEvents();  
      this.canSendMessage = _signalRService.connectionExists; 
  }

  public loggedIn(): string {
    return localStorage.jwt;
  }

  logout() {
    localStorage.clear();
  }

  showMessage(message: string) {
    this.toastr.success(message, 'New notification!');
  }  

  private subscribeToEvents(): void {   
    this._signalRService.connectionEstablished.subscribe(() => {  
        this.canSendMessage = true;  
    });  
    this._signalRService.messageReceived.subscribe((message: GetNotification) => {  
        this._ngZone.run(() => {  
            this.allMessages = message;

            if(!localStorage.jwt) return;
            const tokenPayload = decode(localStorage.getItem('jwt'));
            if (tokenPayload.role == "Admin"){
              this.showMessage(this.allMessages)
            }
        });  
    });  
  }  
}
