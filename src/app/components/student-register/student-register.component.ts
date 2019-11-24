import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { LoginRegisterAuthService } from 'src/app/services/login-register-auth.service';
import { UserDetailsService } from 'src/app/services/user-details.service';

@Component({
  selector: 'app-student-register',
  templateUrl: './student-register.component.html',
  styleUrls: ['./student-register.component.scss']
})
export class StudentRegisterComponent implements OnInit {

  errorMessage: string;
  successMessage: string;

  registerForm = new FormGroup({
    email: new FormControl(),
    password: new FormControl(),
    firstName: new FormControl(),
    lastName: new FormControl()
   });

  constructor(private registerService: LoginRegisterAuthService, private userDetails: UserDetailsService) { }

  ngOnInit() {
  }

  tryRegister(formData) {
    this.registerService.doRegisterStudent(formData)
    .then(res => {
      this.userDetails.createStudentDatabase(formData);
      console.log(res);
      this.errorMessage = '';
      this.successMessage = 'Register Succesfull';
    }, err => {
      console.log(err);
      this.errorMessage = err.message;
      this.successMessage = '';
    });
  }

}
