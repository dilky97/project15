import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { LoginRegisterAuthService } from 'src/app/services/login-register-auth.service';
import { UserDetailsService } from 'src/app/services/user-details.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  errorMessage = 'temp';
  successMessage = 'temp';

  facultyList = [
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

  roleForm = new FormGroup({
    role: new FormControl('Student in UOC')
   });

  StudentRegisterForm = new FormGroup({
   firstName: new FormControl(),
   lastName: new FormControl(),
   email: new FormControl(),
   faculty: new FormControl(),
   year: new FormControl(),
   password: new FormControl(),
  });

  constructor(private registerService: LoginRegisterAuthService, private userDetailsService: UserDetailsService) { }

  ngOnInit() {
  }

  tryStudentRegister(formData) {
    this.registerService.doRegisterStudent(formData).then(
      resAuth => {
        this.userDetailsService.createStudentDatabase(formData).then(
          resDb => {
            this.userDetailsService.createStudentDatabase(formData);
            this.errorMessage = 'temp';
            this.successMessage = 'Authentification And database added Succesfully';
          },
          errDb => {
            this.errorMessage = 'Authentification added Succesfully And database ERROR(' + errDb.message + ')';
            this.successMessage = 'temp';
          }
        );
      },
      errAuth => {
        this.errorMessage = errAuth.message;
        this.successMessage = 'temp';
      }
    );
  }

}
