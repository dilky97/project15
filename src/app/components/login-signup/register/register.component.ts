import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { LoginRegisterAuthService } from 'src/app/services/login-register-auth.service';
import { UserDetailsService } from 'src/app/services/user-details.service';
import { StudentDetails } from 'src/app/models/student-details.model';
import { AdvisorDetails } from 'src/app/models/advisor-details.model'
import { MustMatch } from 'src/app/helpers/must-match.validator';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  errorMessage = 'temp';
  successMessage = 'temp';

  student: StudentDetails = {} as StudentDetails;
  advisor: AdvisorDetails = {} as AdvisorDetails;

  roleForm = this.formBuilder.group({
    role: ['Student in UOC']
  });

  StudentRegisterForm = this.formBuilder.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    email: ['', [Validators.email, Validators.required]],
    faculty: ['', Validators.required],
    year: ['', Validators.required],
    password: ['', [Validators.required, Validators.minLength(6)]],
    confirmPassword: ['', Validators.required],
  }, {
    validator: MustMatch('password', 'confirmPassword')
  });

  AdvisorRegisterForm = this.formBuilder.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    email: ['', [Validators.email, Validators.required]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    confirmPassword: ['', Validators.required],
  }, {
    validator: MustMatch('password', 'confirmPassword')
  });

  constructor(
              private formBuilder: FormBuilder,
              private registerService: LoginRegisterAuthService,
              private userDetailsService: UserDetailsService
             ) { }

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
