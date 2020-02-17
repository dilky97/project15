import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormControl, FormGroup } from '@angular/forms';
import { LoginRegisterAuthService } from 'src/app/services/login-register-auth.service';
import { UserDetailsService } from 'src/app/services/user-details.service';
import { StudentDetails } from 'src/app/models/student-details.model';
import { AdvisorDetails } from 'src/app/models/advisor-details.model';
import { MustMatch } from 'src/app/helpers/must-match.validator';
import { ServiceProviderDetails } from 'src/app/models/service-provider-details.model';
import * as firebase from 'firebase/app';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';
import { MustLecturer } from 'src/app/helpers/must-lecturer.validator';
import { Router } from '@angular/router';
import { Sponsor } from 'src/app/models/sponsor.model';

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
  sponsor: Sponsor = {} as Sponsor;

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
    title: ['2'],
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    email: ['', [MustLecturer, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    confirmPassword: ['', Validators.required],
  }, {
    validator: MustMatch('password', 'confirmPassword')
  });

  ServiceProviderRegisterForm = this.formBuilder.group({
    companyName:['',Validators.required],
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    address:['',Validators.required],
    price:['',Validators.required],
    email: ['', [Validators.email, Validators.required]],
    telephoneNo:['', Validators.required],
    service: ['', Validators.required],
    serviceDes: ['', Validators.required],
    password: ['', [Validators.required, Validators.minLength(6)]],
    confirmPassword: ['', Validators.required],
  }, {
    validator: MustMatch('password', 'confirmPassword')
  });

  SponsorRegisterForm = this.formBuilder.group({
    companyName:['',Validators.required],
    address:['',Validators.required],
    telephoneNo:['', Validators.required],
    website:[''],
    maxBudget:['',Validators.required],
    email:['', [Validators.email]],
    password:['', [Validators.required, Validators.minLength(6)]],
    confirmPassword:['', Validators.required],
  }, {
    validator: MustMatch('password', 'confirmPassword')
  });

  constructor(
              private formBuilder: FormBuilder,
              private registerService: LoginRegisterAuthService,
              private userDetailsService: UserDetailsService,
              private router: Router,
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
            this.router.navigate(['/login']);
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
            this.router.navigate(['/login']);
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
    this.serviceProvider.companyName=formData.companyName;
    this.serviceProvider.firstName = formData.firstName;
    this.serviceProvider.lastName = formData.lastName;
    this.serviceProvider.email = formData.email;
    this.serviceProvider.address = formData.address;
    this.serviceProvider.telephoneNo = formData.telephoneNo;
    this.serviceProvider.price = formData.price;
    this.serviceProvider.service = formData.service;
    this.serviceProvider.serviceDes = formData.serviceDes;
    this.serviceProvider.logo = localStorage.getItem('tempURL');

    this.registerService.doRegisterServiceProvider(formData).then(
      resAuth => {
        this.userDetailsService.createServiceProviderDatabase(this.serviceProvider, resAuth.user.uid ).then(
          resDb => {
            this.errorMessage = 'temp';
            this.successMessage = 'Authentification And database added Succesfully';
            this.router.navigate(['/login']);
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

  trySponsorRegister(formData) {

    this.sponsor.name = formData.companyName;
    this.sponsor.address = formData.address;
    this.sponsor.email = formData.email;
    this.sponsor.maxBudgetLimit = formData.maxBudget;
    this.sponsor.telephoneNo = formData.telephoneNo;
    this.sponsor.websiteUrl = formData.website;
    this.sponsor.logo = localStorage.getItem('tempURL');
    this.sponsor.categories = [] as Array<string>;
    this.sponsor.sponsoredEvents = [] as Array<string>;
    this.sponsor.locationUrl = '';
    this.sponsor.receivedProposals = [] as Array<string>;
    this.sponsor.acceptedProposals = [] as Array<string>;
    this.sponsor.availability = true;

    this.registerService.doRegisterSponsor(formData).then(
      resAuth => {
        this.userDetailsService.createSponsorDatabase(this.sponsor, resAuth.user.uid ).then(
          resDb => {
            this.errorMessage = 'temp';
            this.successMessage = 'Authentification And database added Succesfully';
            this.router.navigate(['/login']);
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
