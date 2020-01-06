import { Component, OnInit, getDebugNode } from '@angular/core';
import * as firebase from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { LoginRegisterAuthService } from 'src/app/services/login-register-auth.service';
import { StudentDetails } from 'src/app/models/student-details.model';
import { AngularFirestore } from '@angular/fire/firestore';
import { UserDetailsService } from 'src/app/services/user-details.service';
import { EventDetailsService } from 'src/app/services/event-details.service';



@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})

export class TestComponent implements OnInit {

  userId: string;
  userEmail: string;
  userDisplayName: string;
  dp: string;

  student: StudentDetails = {} as StudentDetails;
  name: string;

  constructor( private studentDetailsService: UserDetailsService,
               private firestore: AngularFirestore,
               private router: Router,
               private authService: LoginRegisterAuthService,
               private eventDetails: EventDetailsService
             ) {}


  ngOnInit() {

    this.authService.getUser().subscribe(
      user => {
        this.userId = user.uid;
        this.userDisplayName = user.displayName;
        this.userEmail = user.email;
      }
    );

  }

  logOut() {
    this.authService.logOut();
  }

  addUser() {
    return this.firestore.collection('test').add(this.student);
  }

}
