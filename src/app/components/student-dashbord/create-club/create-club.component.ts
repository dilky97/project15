import { Component, OnInit } from '@angular/core';
import { ClubDetails } from 'src/app/models/club-details.model';
import { FormBuilder, Validators } from '@angular/forms';
import { ClubDetailsService } from 'src/app/services/club-details.service';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs';
import { StudentDetails } from 'src/app/models/student-details.model';
import { AngularFirestore } from '@angular/fire/firestore';
import { HttpClient } from '@angular/common/http';
import { unregisteredEmailValidator } from 'src/app/helpers/must-registered.validator';

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

  x: File;

  ClubRegisterForm = this.formBuilder.group({
    name: ['', Validators.required],
    advisor: ['', [Validators.email, Validators.required]],
    president: [''],
    eventPlanner: ['', [Validators.email, Validators.required, unregisteredEmailValidator('students')]],
    des: ['', Validators.required]
  });

  // ClubRegisterForm = this.formBuilder.group({
  //   name: [''],
  //   advisor: [''],
  //   president: [''],
  //   eventPlanner: ['', unregisteredEmailValidator('students')],
  //   des: [''],
  // });

  constructor(
              private formBuilder: FormBuilder,
              private firestore: AngularFirestore,
              private clubDetailsService: ClubDetailsService ,
              private http: HttpClient
             ) {
    firebase.auth().onAuthStateChanged( user => {

      this.userEmail = user.email;

    });
  }

  ngOnInit() {
    console.log(this.x);
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
          console.log(resDb.id);

          const promise = this.firestore.firestore.collection('students').doc(user.uid).get();
          promise.then( snapshot => {
            this.student =  snapshot.data() as StudentDetails;
            this.student.presidentIn.push({id: this.returnedId , name: this.club.name});
            this.firestore.collection('students').doc(user.uid).update(this.student);
          });

          this.errorMessage = 'temp';
          this.successMessage = 'database added Succesfully';
        },
        errDb => {
          this.errorMessage = 'database ERROR(' + errDb.message + ')';
          this.successMessage = 'temp';
        }
      );

    });

  }

}
