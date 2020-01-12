import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase/app';
import { Router } from '@angular/router';
import { StudentDetails } from 'src/app/models/student-details.model';
import { AngularFirestore } from '@angular/fire/firestore';
import { UserDetailsService } from 'src/app/services/user-details.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  email: string;
  student: StudentDetails;

  isLogged = false;

  constructor(private router: Router, private userDetails: UserDetailsService) { }

  ngOnInit() {

    firebase.auth().onAuthStateChanged( user => {
      if (user) {
        this.userDetails.readStudentDatabase(user.uid).subscribe( temp => {
          this.student = temp as StudentDetails;
          console.log(this.student);
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
