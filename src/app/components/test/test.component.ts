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

  a = [] as Array<{id: string, name: string}>;

  constructor( private studentDetailsService: UserDetailsService,
               private firestore: AngularFirestore,
               private router: Router,
               private authService: LoginRegisterAuthService,
               private eventDetails: EventDetailsService
             ) {}


  ngOnInit() {

    this.a.push({id: '7', name: 'priyashan'});
    this.a.push({id: '7', name: 'priyashan'});
    console.log( this.a.findIndex(i => i.id === '7'));

  }


}
