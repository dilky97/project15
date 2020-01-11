import { Component, OnInit } from '@angular/core';
import { ClubDetails } from 'src/app/models/club-details.model';
import { FormGroup, FormControl } from '@angular/forms';
import { ClubDetailsService } from 'src/app/services/club-details.service';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs';
import { StudentDetails } from 'src/app/models/student-details.model';
import { UserDetailsService } from 'src/app/services/user-details.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { async } from '@angular/core/testing';
import {HttpClient} from '@angular/common/http';



@Component({
  selector: 'app-create-club',
  templateUrl: './create-club.component.html',
  styleUrls: ['./create-club.component.scss']
})
export class CreateClubComponent implements OnInit {

  errorMessage = 'temp';
  successMessage = 'temp';

  club: ClubDetails = {} as ClubDetails;
  student: StudentDetails = {} as StudentDetails;

  userEmail: string;

  studentObservable: Observable<StudentDetails>;

  returnedId: string;

  ClubRegisterForm = new FormGroup({
    name: new FormControl(),
    advisor: new FormControl(),
    president: new FormControl(),
    eventPlanner: new FormControl(),
    des: new FormControl()
  });

  constructor(
               private firestore: AngularFirestore,
               private clubDetailsService: ClubDetailsService ,
               private studentDetailsService: UserDetailsService,
               private http: HttpClient
             ) {
    firebase.auth().onAuthStateChanged( user => {

      this.userEmail = user.email;

    });
  }

  ngOnInit() {
    this.http.get( 'https://us-central1-testing-1de9d.cloudfunctions.net/sendMail?dest=priyashanshell@gmail.com&msg=cdhscvdhcd' );
  }

  tryClubRegister(formData) {

    this.club.name = formData.name;
    this.club.advisor = formData.advisor;
    this.club.eventPlanner = formData.eventPlanner;
    this.club.des = formData.des;
    this.club.events = {} as string[];
    this.club.isActivated = false;

    firebase.auth().onAuthStateChanged(async user => {

      this.club.president = user.email ;

      this.clubDetailsService.createClubDatabase(this.club).then(
        resDb => {
          this.returnedId = resDb.id;
          this.errorMessage = 'temp';
          this.successMessage = 'database added Succesfully';
        },
        errDb => {
          this.errorMessage = 'database ERROR(' + errDb.message + ')';
          this.successMessage = 'temp';
        }
      );
      // this.http.get( 'https://us-central1-testing-1de9d.cloudfunctions.net/sendMail?dest=priyashanshell@gmail.com&msg=cdhscvdhcd' );



      this.student = (await this.firestore.firestore.collection('students').doc(user.uid).get()).data() as StudentDetails;
      this.student.presidentIn.push({id: this.returnedId , name: this.club.name});
      this.firestore.collection('students').doc(user.uid).update(this.student);

    });

  }

}
