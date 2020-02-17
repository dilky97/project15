import { Component, OnInit } from '@angular/core';
import { LoginRegisterAuthService } from 'src/app/services/login-register-auth.service';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { UserDetailsService } from 'src/app/services/user-details.service';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  errorMessage = 'temp';
  successMessage = 'temp';

  user: any;

  registerForm = new FormGroup({
    email: new FormControl(),
    password: new FormControl()
  });

  constructor(
              private firestore: AngularFirestore,
              private loginService: LoginRegisterAuthService,
              private router: Router,
              private userDetailsService: UserDetailsService
             ) { }

  ngOnInit() {
  }

  tryLogin(formData) {
    this.loginService.doLogin(formData)
    .then(res => {
      this.loginService.getUser().subscribe( async user => {
        if (user) {
          localStorage.setItem('uid', user.uid);
          localStorage.setItem('displayName', user.displayName);
          localStorage.setItem('profilePicture', user.photoURL);

          if (user.displayName === 'student') {
            this.userDetailsService.readStudentDatabase( user.uid ).subscribe( temp => {
              this.user = temp;
              localStorage.setItem('user', JSON.stringify(this.user));
              console.log(JSON.parse(localStorage.getItem('user')));
              this.router.navigate(['/home']);
            });
          }

          if (user.displayName === 'advisor') {
            this.userDetailsService.readAdvisorDatabase( user.uid ).subscribe( temp => {
              this.user = temp;
              localStorage.setItem('user', JSON.stringify(this.user));
              console.log(JSON.parse(localStorage.getItem('user')));
              this.router.navigate(['/home']);
            });
          }

          if (user.displayName === 'serviceProvider') {
            this.userDetailsService.readServiceProviderDatabase( user.uid ).subscribe( temp => {
              this.user = temp;
              localStorage.setItem('user', JSON.stringify(this.user));
              console.log(JSON.parse(localStorage.getItem('user')));
              this.router.navigate(['/home']);
            });
          }

          if (user.displayName === 'sponsor') {
            this.userDetailsService.readSponsorDatabase( user.uid ).subscribe( temp => {
              this.user = temp;
              localStorage.setItem('user', JSON.stringify(this.user));
              console.log(JSON.parse(localStorage.getItem('user')));
              this.router.navigate(['/home']);
            });
          }

        } else { // no user
          this.errorMessage = 'Login Error, Try Again !';
          this.successMessage = 'temp';
        }
      });
    }, err => {
      console.log(err);
      this.errorMessage = err.message;
      this.successMessage = 'temp';
    });
  }

}
