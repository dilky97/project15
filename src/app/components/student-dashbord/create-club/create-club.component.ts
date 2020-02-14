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
import { MustLecturer } from 'src/app/helpers/must-lecturer.validator';

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

  ClubRegisterForm = this.formBuilder.group({
    name: ['', Validators.required],
    advisor: ['', [MustLecturer, Validators.email, Validators.required]],
    president: [''],
    eventPlanner: ['', [Validators.email, Validators.required, unregisteredEmailValidator('students')]],
    des: ['', Validators.required]
  });

  constructor(
              private formBuilder: FormBuilder,
              private firestore: AngularFirestore,
              private clubDetailsService: ClubDetailsService ,
              private http: HttpClient
             ) {
  }

  ngOnInit() {
    this.student = JSON.parse(localStorage.getItem('user'));
  }

  tryClubRegister(formData) {

    this.club.name = formData.name;
    this.club.advisor = formData.advisor;
    this.club.eventPlanner = formData.eventPlanner;
    this.club.des = formData.des;
    this.club.events = [] as Array<string>;
    this.club.isActivated = false;
    this.club.president = this.student.email ;

    this.clubDetailsService.createClubDatabase(this.club).then(
      async resDb => {
        this.returnedId = resDb.id;

        this.student.presidentIn.push({id: this.returnedId , name: this.club.name});
        await this.firestore.collection('students').doc(localStorage.getItem('uid')).update(this.student);
        localStorage.setItem('user', JSON.stringify(this.student));

        this.errorMessage = 'temp';
        this.successMessage = 'Club created Successfully';
      },
      errDb => {
        this.errorMessage = 'database ERROR(' + errDb.message + ')';
        this.successMessage = 'temp';
      }
    );

  }

}
