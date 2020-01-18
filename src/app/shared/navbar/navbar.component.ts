import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase/app';
import { Router } from '@angular/router';
import { StudentDetails } from 'src/app/models/student-details.model';
import { AngularFirestore } from '@angular/fire/firestore';
import { UserDetailsService } from 'src/app/services/user-details.service';
import { ServiceProviderDetails } from 'src/app/models/service-provider-details.model';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  email: string;
  user: any;

  isLogged = false;

  constructor(private router: Router, private userDetails: UserDetailsService) { }

  ngOnInit() {

    firebase.auth().onAuthStateChanged( user => {
      if (user.displayName == 'student') {
        this.userDetails.readStudentDatabase(user.uid).subscribe( temp => {
          this.user = temp as StudentDetails;
          console.log(this.user);
          this.isLogged = true;
        });
      } else if (user.displayName == 'serviceProvider') {
        this.userDetails.readServiceProviderDatabase(user.uid).subscribe( temp => {
          this.user = temp as ServiceProviderDetails;
          console.log(this.user);
          this.isLogged = true;
        });
      } else {
        this.isLogged = false;
      }
    });

  }

  logOut() {
    firebase.auth().signOut();
    this.router.navigate(['/home']);
  }

}
