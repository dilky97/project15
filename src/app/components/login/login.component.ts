import { Component, OnInit } from '@angular/core';
import { LoginRegisterAuthService } from 'src/app/services/login-register-auth.service';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  errorMessage: string;
  successMessage: string;

  registerForm = new FormGroup({
    email: new FormControl(),
    password: new FormControl()
   });

  constructor(private loginService: LoginRegisterAuthService, private router: Router) { }

  ngOnInit() {
  }

  tryLogin(formData) {
    this.loginService.doLogin(formData)
    .then(res => {
      console.log(res);
      this.errorMessage = '';
      this.successMessage = 'You Logged In';
      this.router.navigate(['/home']);
    }, err => {
      console.log(err);
      this.errorMessage = err.message;
      this.successMessage = '';
    });
  }

}
