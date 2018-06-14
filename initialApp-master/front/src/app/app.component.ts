import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';

  public loggedIn(): string {
    return localStorage.jwt;
  }

  logout() {
    localStorage.clear();
  }
}
