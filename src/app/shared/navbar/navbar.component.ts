import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase/app';
import { StudentDetails } from 'src/app/models/student-details.model';
import { UserDetailsService } from 'src/app/services/user-details.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  email: string;
  student: StudentDetails;

  isLogged: number;

  constructor(private userDetails: UserDetailsService, private router: Router) { }

  ngOnInit() {

    firebase.auth().onAuthStateChanged( user => {
      if (user) {
        this.userDetails.readStudentDatabase(user.uid).subscribe( temp => {
          this.student = temp as StudentDetails;
          this.isLogged = 1;
        });
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
