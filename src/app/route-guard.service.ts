import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, Route } from '@angular/router';
import { LoginRegisterAuthService } from './services/login-register-auth.service';
import * as firebase from 'firebase/app';
import { Observable, Subscription } from 'rxjs';

@Injectable()

export class RouteGuardService implements CanActivate {

  constructor(private afAuth: LoginRegisterAuthService, private router: Router) {

  }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {

    // this.afAuth.getUser().subscribe(
    //   user => {
    //     if (user) {
    //       localStorage.setItem('displayName', user.displayName);
    //     } else {
    //       localStorage.setItem('displayName', 'null');
    //     }
    //   }
    // );

    if ( localStorage.getItem('displayName') === next.data.role ) {
      return true;
    } else {
      this.router.navigate(['/home']);
    }

  }

}
