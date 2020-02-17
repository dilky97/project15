import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import { LoginRegisterAuthService } from 'src/app/services/login-register-auth.service';
import { AngularFireStorage } from '@angular/fire/storage';
import { Router } from '@angular/router';
import { finalize } from 'rxjs/operators';
import { AngularFirestore } from '@angular/fire/firestore';
import { AdvisorDetails } from 'src/app/models/advisor-details.model';

@Component({
  selector: 'app-advisor-edit',
  templateUrl: './advisor-edit.component.html',
  styleUrls: ['./advisor-edit.component.scss']
})
export class AdvisorEditComponent implements OnInit {

  constructor(
              private formBuilder: FormBuilder,
              private firestore: AngularFirestore,
              private storage: AngularFireStorage,
              private router: Router,
              private loginService: LoginRegisterAuthService
             ) { }

  currentAdvisor: AdvisorDetails = {} as AdvisorDetails;
  newAdvisor: AdvisorDetails = {} as AdvisorDetails;

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

  AdvisorUpdateForm = this.formBuilder.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    title: ['', Validators.required],
  });

  ngOnInit() {
    this.currentAdvisor = JSON.parse(localStorage.getItem('user'));
    console.log(this.currentAdvisor);
    this.AdvisorUpdateForm = this.formBuilder.group({
      firstName: this.currentAdvisor.firstName,
      lastName: this.currentAdvisor.lastName,
      title: this.currentAdvisor.title,
    });
  }

  async updateAdvisor(formData) {

    this.newAdvisor.firstName = formData.firstName;
    this.newAdvisor.lastName = formData.lastName;
    this.newAdvisor.title = formData.title;
    this.newAdvisor.email = this.currentAdvisor.email;
    this.newAdvisor.advisorIn = this.currentAdvisor.advisorIn;
    this.newAdvisor.newClubRequests = this.currentAdvisor.newClubRequests;

    localStorage.setItem('user', JSON.stringify(this.newAdvisor));

    await this.firestore.collection('advisors').doc(localStorage.getItem('uid')).update(this.newAdvisor);

    this.loginService.getUser().subscribe( async user => {
      await user.updateProfile({photoURL: localStorage.getItem('tempURL')});
    });

    localStorage.setItem('profilePicture', localStorage.getItem('tempURL'));

    this.router.navigate(['advisor-dashboard']);

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
