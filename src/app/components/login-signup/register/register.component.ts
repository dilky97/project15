import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { LoginRegisterAuthService } from 'src/app/services/login-register-auth.service';
import { UserDetailsService } from 'src/app/services/user-details.service';
import { StudentDetails } from 'src/app/models/student-details.model';
import { AdvisorDetails } from 'src/app/models/advisor-details.model';
import { MustMatch } from 'src/app/helpers/must-match.validator';
import { ServiceProviderDetails } from 'src/app/models/service-provider-details.model';
import * as firebase from 'firebase/app';
import { MustLecturer } from 'src/app/helpers/must-lecturer.validator';

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
  serviceProvider: ServiceProviderDetails = {} as ServiceProviderDetails;

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
    title: ['Mr.'],
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    email: ['', [MustLecturer, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    confirmPassword: ['', Validators.required],
  }, {
    validator: MustMatch('password', 'confirmPassword')
  });

  ServiceProviderRegisterForm = this.formBuilder.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    email: ['', [Validators.email, Validators.required]],
    service: ['', Validators.required],
    serviceDes: ['', Validators.required],
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
    this.student.participatingEvents = [] as Array<string> ;
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
            firebase.auth().currentUser.delete().then( resDel => {
              this.errorMessage = 'SignUp error: Try again(' + errDb.message + ')';
              this.successMessage = 'temp';
            });
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

    this.advisor.title = formData.title;
    this.advisor.firstName = formData.firstName;
    this.advisor.lastName = formData.lastName;
    this.advisor.email = formData.email;
    this.advisor.advisorIn = [] as Array<{id: string, name: string}>;
    this.advisor.newClubRequests = [] as Array<{id: string, name: string}>;

    this.registerService.doRegisterAdvisor(formData).then(
      resAuth => {
        this.userDetailsService.createAdvisorDatabase(this.advisor, resAuth.user.uid ).then(
          resDb => {
            this.errorMessage = 'temp';
            this.successMessage = 'Authentification And database added Succesfully';
          },
          errDb => {
            firebase.auth().currentUser.delete().then( resDel => {
              this.errorMessage = 'SignUp error: Try again(' + errDb.message + ')';
              this.successMessage = 'temp';
            });
          }
        );
      },
      errAuth => {
        this.errorMessage = errAuth.message;
        this.successMessage = 'temp';
      }
    );

  }

  tryServiceProviderRegister(formData) {

    this.serviceProvider.firstName = formData.firstName;
    this.serviceProvider.lastName = formData.lastName;
    this.serviceProvider.email = formData.email;
    this.serviceProvider.service = formData.service;
    this.serviceProvider.serviceDes = formData.serviceDes;

    this.registerService.doRegisterServiceProvider(formData).then(
      resAuth => {
        this.userDetailsService.createServiceProviderDatabase(this.serviceProvider, resAuth.user.uid ).then(
          resDb => {
            this.errorMessage = 'temp';
            this.successMessage = 'Authentification And database added Succesfully';
          },
          errDb => {
            firebase.auth().currentUser.delete().then( resDel => {
              this.errorMessage = 'SignUp error: Try again(' + errDb.message + ')';
              this.successMessage = 'temp';
            });
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
