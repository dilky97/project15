import { Component, OnInit } from '@angular/core';
import { ClubDetails } from 'src/app/models/club-details.model';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import { ClubDetailsService } from 'src/app/services/club-details.service';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs';
import { StudentDetails } from 'src/app/models/student-details.model';
import { AngularFirestore } from '@angular/fire/firestore';
import { HttpClient } from '@angular/common/http';
import { unregisteredEmailValidator } from 'src/app/helpers/must-registered.validator';
import { MustLecturer } from 'src/app/helpers/must-lecturer.validator';
import { AdvisorDetails } from 'src/app/models/advisor-details.model';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';


@Component({
  selector: 'app-create-club',
  templateUrl: './create-club.component.html',
  styleUrls: ['./create-club.component.scss']
})

export class CreateClubComponent implements OnInit {

    ///////// IMAGE UPLOADER - variables //////////
    imgSrc = '../../../../assets/profile.jpg';
    selectedImage: any = null;
    uploadPercentage: any;

    imageForm = new FormGroup({
      imageUrl: new FormControl('', Validators.required)
    });
    ///////////////////////////////////////////////

  errorMessage = 'temp';
  successMessage = 'temp';

  club: ClubDetails = {} as ClubDetails;

  student: StudentDetails = {} as StudentDetails;

  advisor: AdvisorDetails = {} as AdvisorDetails;
  advisorId: string;

  eventPlanner: StudentDetails = {} as StudentDetails;
  eventPlannerId: string;

  userEmail: string;

  studentObservable: Observable<StudentDetails>;

  returnedId: string;

  xx: any;

  ClubRegisterForm = this.formBuilder.group({
    name: ['', Validators.required],
    advisor: ['', [MustLecturer, Validators.email, Validators.required, unregisteredEmailValidator('advisors')]],
    president: [''],
    eventPlanner: ['', [Validators.email, Validators.required, unregisteredEmailValidator('students')]],
    des: ['', Validators.required]
  });

  constructor(
              private formBuilder: FormBuilder,
              private firestore: AngularFirestore,
              private clubDetailsService: ClubDetailsService ,
              private http: HttpClient,
              private storage: AngularFireStorage,
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
    this.club.president = this.student.email;
    this.club.id = '';
    this.club.logo = localStorage.getItem('tempURL');

    this.clubDetailsService.createClubDatabase(this.club).then(
      async resDb => {
        this.returnedId = resDb.id;
        await this.firestore.collection('clubs').doc(this.returnedId).update({id: this.returnedId});

        const promise1 = firebase.firestore().collection('advisors').where( 'email', '==', this.club.advisor ).get();
        promise1.then( async res => {
          res.forEach( doc => {
            this.advisor = doc.data() as AdvisorDetails;
            this.advisorId = doc.id;
          });
          this.advisor.newClubRequests.push({id: this.returnedId, name: this.club.name});
          await this.firestore.collection('advisors').doc(this.advisorId).update(this.advisor);
        });

        const promise2 = firebase.firestore().collection('students').where( 'email', '==', this.club.eventPlanner ).get();
        promise2.then( async res => {
          res.forEach( doc => {
            this.eventPlanner = doc.data() as StudentDetails;
            this.eventPlannerId = doc.id;
          });
          this.eventPlanner.eventPlannerIn.push({id: this.returnedId, name: this.club.name});
          await this.firestore.collection('students').doc(this.eventPlannerId).update(this.eventPlanner);
        });

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

  /////////////////// image uploader functions - start //////////////////////
  onSubmit(formData) {
    const filePath = `images/${this.selectedImage.name}_${new Date().getTime()}`;
    const task = this.storage.upload(filePath, this.selectedImage);
    this.uploadPercentage = task.percentageChanges();
    const fileRef = this.storage.ref(filePath);
    task.snapshotChanges().pipe(
      finalize(() => {
        fileRef.getDownloadURL().subscribe( url => {
          console.log(url);
          localStorage.setItem('tempURL', url);
          formData.imageUrl = url ;
          // this.resetForm();
        });
      })
    ).subscribe();
  }

  showPreview(event: any, temp: any) {
    if ( event.target.files && event.target.files[0] ) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.imgSrc = e.target.result;
      };
      reader.readAsDataURL(event.target.files[0]);
      this.selectedImage = event.target.files[0];
    } else {
      this.imgSrc = '../../../../assets/profile.jpg';
      this.selectedImage = null;
    }
    this.onSubmit(temp);
  }
  /////////////////// image uploader functions - end //////////////////////

}
