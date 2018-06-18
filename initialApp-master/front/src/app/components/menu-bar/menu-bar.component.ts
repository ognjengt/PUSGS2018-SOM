import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu-bar',
  templateUrl: './menu-bar.component.html',
  styleUrls: ['./menu-bar.component.css']
})
export class MenuBarComponent implements OnInit {
  appName: string;
  signedIn: boolean;

  constructor() {
    this.appName = "Rent a Vehicle";
   }

  ngOnInit() {
  }

  loggedIn(): string {
    return localStorage.jwt;
  }

  getRole(): string {
    return localStorage.role;
  }

  logout() {
    localStorage.clear();
  }
}
