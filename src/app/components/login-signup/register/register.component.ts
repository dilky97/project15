import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { LoginRegisterAuthService } from 'src/app/services/login-register-auth.service';
import { UserDetailsService } from 'src/app/services/user-details.service';
import { StudentDetails } from 'src/app/models/student-details.model';
import { AdvisorDetails } from 'src/app/models/advisor-details.model';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  errorMessage = 'temp';
  successMessage = 'temp';

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

  student: StudentDetails = {} as StudentDetails;
  advisor: AdvisorDetails = {} as AdvisorDetails;

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

  AdvisorRegisterForm = new FormGroup({
    firstName: new FormControl(),
    lastName: new FormControl(),
    email: new FormControl(),
    password: new FormControl(),
  });

  constructor(private registerService: LoginRegisterAuthService, private userDetailsService: UserDetailsService) { }

  ngOnInit() {
  }

  tryStudentRegister(formData) {

    this.student.firstName = formData.firstName ;
    this.student.lastName = formData.lastName;
    this.student.email = formData.email;
    this.student.faculty = formData.faculty;
    this.student.academicYear = formData.year;
    this.student.participatingEvents = [] as string[] ;
    this.student.presidentIn = [] as Array<{id: string, name: string}> ;
    this.student.eventPlannerIn = [] as Array<{id: string, name: string}> ;

    this.registerService.doRegisterStudent(formData).then(
      resAuth => {
        this.userDetailsService.createStudentDatabase(this.student, resAuth.user.uid ).then(
          resDb => {
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

  tryAdvisorRegister(formData) {

    this.advisor.firstName = formData.firstName ;
    this.advisor.lastName = formData.lastName;
    this.advisor.email = formData.email;

    this.registerService.doRegisterAdvisor(formData).then(
      resAuth => {
        this.userDetailsService.createAdvisorDatabase(this.student).then(
          resDb => {
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
