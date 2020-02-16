import { Component, OnInit } from '@angular/core';
import { StudentDetails } from 'src/app/models/student-details.model';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import { LoginRegisterAuthService } from 'src/app/services/login-register-auth.service';
import { AngularFireStorage } from '@angular/fire/storage';
import { Router } from '@angular/router';
import { finalize } from 'rxjs/operators';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-student-edit',
  templateUrl: './student-edit.component.html',
  styleUrls: ['./student-edit.component.scss']
})
export class StudentEditComponent implements OnInit {

  constructor(
              private formBuilder: FormBuilder,
              private firestore: AngularFirestore,
              private storage: AngularFireStorage,
              private router: Router,
              private loginService: LoginRegisterAuthService
             ) { }

  currentStudent: StudentDetails = {} as StudentDetails;
  newStudent: StudentDetails = {} as StudentDetails;

  errorMessage = 'temp';
  successMessage = 'temp';

    ///////// IMAGE UPLOADER - variables //////////
    imgSrc = localStorage.getItem('profilePicture');
    selectedImage: any = null;
    uploadPercentage: any;

    imageForm = new FormGroup({
      imageUrl: new FormControl('', Validators.required)
    });
    ///////////////////////////////////////////////

  StudentUpdateForm = this.formBuilder.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    faculty: ['', Validators.required],
    year: ['', Validators.required],
  });

  ngOnInit() {
    this.currentStudent = JSON.parse(localStorage.getItem('user'));
    console.log(this.currentStudent);
    this.StudentUpdateForm = this.formBuilder.group({
      firstName: this.currentStudent.firstName,
      lastName: this.currentStudent.lastName,
      faculty: this.currentStudent.faculty,
      year: this.currentStudent.academicYear
    });
  }

  async updateStudent(formData) {

    this.newStudent.firstName = formData.firstName;
    this.newStudent.lastName = formData.lastName;
    this.newStudent.faculty = formData.faculty;
    this.newStudent.academicYear = formData.year;
    this.newStudent.eventPlannerIn = this.currentStudent.eventPlannerIn;
    this.newStudent.presidentIn = this.currentStudent.presidentIn;
    this.newStudent.participatingEvents = this.currentStudent.participatingEvents;
    this.newStudent.email = this.currentStudent.email;

    localStorage.setItem('user', JSON.stringify(this.newStudent));

    await this.firestore.collection('students').doc(localStorage.getItem('uid')).update(this.newStudent);

    this.loginService.getUser().subscribe( async user => {
      await user.updateProfile({photoURL: localStorage.getItem('tempURL')});
    });

    localStorage.setItem('profilePicture', localStorage.getItem('tempURL'));

    this.router.navigate(['student-dashboard']);

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
      this.imgSrc = localStorage.getItem('profilePicture');
      this.selectedImage = null;
    }
    this.onSubmit(temp);
  }
  /////////////////// image uploader functions - end //////////////////////

}
