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
    firstName: new FormControl(),
    lastName: new FormControl(),
    email: new FormControl(),
    faculty: new FormControl(),
    year: new FormControl(),
    password: new FormControl(),
   });

   facultyList = [
     '',
     'University of colombo school of computing',
     'Faculty of Science',
     'Faculty of Management',
     'Faculty of Arts',
     'Faculty of Low',
     'Faculty of Nursing',
     'Faculty of Medicine',
     'Faculty of Techmology',
     'Faculty of Educarion',
     'Faculty of Ayurvedhic',
   ];

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
