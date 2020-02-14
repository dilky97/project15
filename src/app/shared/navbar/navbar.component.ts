import { Component, OnInit, ɵConsole } from '@angular/core';
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
  displayName = localStorage.getItem('displayName');
  profilePicture = '../../../assets/profile.jpg';

  isLogged: number;

  constructor(private userDetails: UserDetailsService, private router: Router) { }

  ngOnInit() {
    console.log(JSON.parse(localStorage.getItem('user')));

    if (JSON.parse(localStorage.getItem('user'))) {
      this.user = JSON.parse(localStorage.getItem('user'));
      if ((localStorage.getItem('profilePicture')) !== 'null' ) {
        this.profilePicture = localStorage.getItem('profilePicture');
      }
      this.isLogged = 1;
    } else {
      this.isLogged = 0;
    }
  }

  logOut() {
    localStorage.clear();
    firebase.auth().signOut();
    location.reload();
  }

}
