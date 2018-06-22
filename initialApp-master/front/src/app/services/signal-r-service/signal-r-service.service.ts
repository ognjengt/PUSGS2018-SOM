import { Injectable, EventEmitter  } from '@angular/core';
import { GetNotification } from '../../models/GetNotification'; 

Injectable({
  providedIn: 'root'
})

declare var $: any; 

export class SignalRServiceService {

  private proxy: any;  
  private proxyName: string = 'notifications';  
  private connection: any;

  public messageReceived: EventEmitter <GetNotification> ;  
  public connectionEstablished: EventEmitter <Boolean> ;  
  public connectionExists: Boolean; 

  constructor() { 
      this.connectionEstablished = new EventEmitter <Boolean> ();  
      this.messageReceived = new EventEmitter <GetNotification> ();  
      this.connectionExists = false;

      this.connection = $.hubConnection('https://localhost:44347/');
      this.proxy = this.connection.createHubProxy(this.proxyName);
      this.registerOnServerEvents();  
      this.startConnection(); 
  }

  public sendNotification() {  
    // server side hub method using proxy.invoke with method name pass as param  
    this.proxy.invoke('NotifyAdmin');  
  }  

  private startConnection(): void {  
    this.connection.start().done((data: any) => {  
        console.log("Uspesna konekcija")
        this.connectionEstablished.emit(true);  
        this.connectionExists = true;  
    }).fail((error: any) => {          
        console.log('Could not connect ' + error);
        this.connectionEstablished.emit(false);  
    });  
  }  

  private registerOnServerEvents(): void {  
    this.proxy.on('sendNotification', (data: GetNotification) => {  
        this.messageReceived.emit(data);  
    });  
  } 
}
