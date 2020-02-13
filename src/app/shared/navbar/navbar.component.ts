import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase/app';
import { StudentDetails } from 'src/app/models/student-details.model';
import { UserDetailsService } from 'src/app/services/user-details.service';
import { Router } from '@angular/router';
import { AdvisorDetails } from 'src/app/models/advisor-details.model';
import { ServiceProviderDetails } from 'src/app/models/service-provider-details.model';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  user: any;
  displayName: string;

  isLogged: number;

  constructor(private userDetails: UserDetailsService, private router: Router) { }

  ngOnInit() {

    firebase.auth().onAuthStateChanged( user => {
      if (user) {
        if (user.displayName === 'student') {
          this.displayName = user.displayName;
          this.userDetails.readStudentDatabase(user.uid).subscribe( temp => {
            this.user = temp as StudentDetails;
            this.isLogged = 1;
          });
        } else if (user.displayName === 'advisor') {
          this.displayName = user.displayName;
          this.userDetails.readAdvisorDatabase(user.uid).subscribe( temp => {
            this.user = temp as AdvisorDetails;
            this.isLogged = 1;
          });
        } else if (user.displayName === 'serviceProvider') {
          this.displayName = user.displayName;
          this.userDetails.readServiceProviderDatabase(user.uid).subscribe( temp => {
            this.user = temp as ServiceProviderDetails;
            this.isLogged = 1;
          });
        } else {
          this.isLogged = 0;
        }
      } else {
        this.isLogged = 0;
      }
    });

  }

  logOut() {
    firebase.auth().signOut();
    this.router.navigate(['/home']);
  }

}
