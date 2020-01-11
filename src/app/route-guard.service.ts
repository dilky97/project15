import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, Route } from '@angular/router';
import { LoginRegisterAuthService } from './services/login-register-auth.service';
import * as firebase from 'firebase/app';
import { Observable, Subscription } from 'rxjs';

@Injectable()

export class RouteGuardService implements CanActivate {

  isEventPlanner: Observable<boolean>;

  constructor(private afAuth: LoginRegisterAuthService, private router: Router) {

  }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {

    // if ( firebase.auth().currentUser.displayName === next.data.role ) {
    //   return true;
    // } else {
    //   return false;
    // }
      return true;


    // this.afAuth.getUser().subscribe(
    //   user => {
    //     if ( firebase.auth().currentUser.displayName === next.data.role ) {
    //       return true;
    //     } else {
    //       return false;
    //     }
    //   }
    // );


  }

}


