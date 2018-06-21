import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import decode from 'jwt-decode';

@Injectable()
export class ManagerGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate() {
    const tokenPayload = decode(localStorage.getItem('jwt'));
    if(tokenPayload.role == 'Manager' || tokenPayload.role == 'Admin') {
      return true;
    }
    else {
      this.router.navigateByUrl('/home');
      return false;
    }
  }
}