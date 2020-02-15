import { Component, OnInit } from '@angular/core';
import { UserDetailsService } from 'src/app/services/user-details.service';
import { ServiceProviderDetails } from 'src/app/models/service-provider-details.model';
import { Observable } from 'rxjs';
import * as firebase from 'firebase/app';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { EventDetailsService } from 'src/app/services/event-details.service';
import { EventDetails } from 'src/app/models/event-details.model';
import {
  AngularFireStorage,
  AngularFireStorageReference,
  AngularFireUploadTask
} from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-serviceprovider-home',
  templateUrl: './serviceprovider-home.component.html',
  styleUrls: ['./serviceprovider-home.component.scss']
})
export class ServiceproviderHomeComponent implements OnInit {
  files: File[] = [];
  file: Observable<any>;
  isHovering: boolean;
  uploadPercent: Observable<number>;
  downloadURL: Observable<string>;
  task: AngularFireUploadTask;
  percentage: Observable<number>;
  snapshot: Observable<any>;
  ref: AngularFireStorageReference;
 images: Observable<any[]>;


  constructor(
               private firestore:AngularFirestore,
               private afStorage: AngularFireStorage,
               private ServiceProviderDetails: UserDetailsService,
               public router: Router,
               private eventDetails: EventDetailsService,
               private toastr: ToastrService
  ) {
    
    this.images = this.firestore.collection('spEvents', ref => ref.orderBy('date')).valueChanges({idField:'id'});
    this.id = localStorage.getItem("id");
   }

   id;
  serviceProvider: ServiceProviderDetails = {} as ServiceProviderDetails;
  // allEventList: EventDetails[] ;
  // participatingEventList: EventDetails[] = [] as EventDetails[];

  serviceProviderObservable: Observable<ServiceProviderDetails>;
  // data;
  // id = 'EOAb2xg26PhVrrd4lHq7';
  ngOnInit() {
  
    

    firebase.auth().onAuthStateChanged( user => {
      if (user.displayName === 'serviceProvider') {
        localStorage.setItem("id",user.uid);

        this.serviceProviderObservable = this.ServiceProviderDetails.readServiceProviderDatabase( user.uid ) as Observable<ServiceProviderDetails> ;

        this.serviceProviderObservable.subscribe( temp => {

          this.serviceProvider = temp as ServiceProviderDetails ;

          console.log(temp);

          //this.getParticipatingEvents(this.serviceProvider.participatingEvents);

          

        });

      } else {
        this.router.navigate(['/no-access']);
      }


    });

    

  }
  
  uploadFile(event) {
  
    const file = event.target.files[0];
    const filePath = '/spEvents/' + Date.now() + '-' + this.files[0];
    const fileRef = this.afStorage.ref(filePath);
    const task = this.afStorage.upload(filePath, file);
    this.ref = this.afStorage.ref(filePath);
    this.uploadPercent = task.percentageChanges();
    task
      .snapshotChanges()
      .pipe(
        finalize(async () => {
          this.downloadURL = await this.ref.getDownloadURL().toPromise();
          this.firestore.collection('spEvents').add({
            type: 'file',
            time: Date.now(),
            date: new Date(),
            sender: this.serviceProvider.firstName,
            email: this.serviceProvider.email,
            url: this.downloadURL
          });
        })
      )
      .subscribe();
  }
 
  delete(Id) {
    if (confirm('Are you sure to delete this event?')) {
    this.firestore.doc('spEvents/' + Id).delete();
    this.toastr.warning('Event was removed successfully');
   }
  }

  deleteAcc(id){
    this.firestore.doc('serviceProviders/' + id).delete();
    this.router.navigate(['/home']);
  }
   
  }

  

  


    
   





