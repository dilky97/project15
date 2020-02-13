import { Component, OnInit } from '@angular/core';
import { UserDetailsService } from 'src/app/services/user-details.service';
import { ServiceProviderDetails } from 'src/app/models/service-provider-details.model';
import { Observable } from 'rxjs';
import * as firebase from 'firebase/app';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { EventDetailsService } from 'src/app/services/event-details.service';
import { EventDetails } from 'src/app/models/event-details.model';

@Component({
  selector: 'app-serviceprovider-home',
  templateUrl: './serviceprovider-home.component.html',
  styleUrls: ['./serviceprovider-home.component.scss']
})
export class ServiceproviderHomeComponent implements OnInit {

  constructor(
               private firestore:AngularFirestore,
               private ServiceProviderDetails: UserDetailsService,
               public router: Router,
               private eventDetails: EventDetailsService
  ) { }
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
  
  
   
  }

  // getParticipatingEvents(participatingEventIds: Array<string>) {

  //   this.eventDetails.getAllEvents().subscribe( actionArray => {

  //     this.allEventList = actionArray.map( item => {
  //       return {
  //         id: item.payload.doc.id,
  //         ...item.payload.doc.data()
  //       } as EventDetails ;
  //     });

  //   });

  //   this.allEventList.forEach(element => {
  //     if (participatingEventIds.includes(element.id)) {
  //       this.participatingEventList.push(element);
  //     }
  //   });

  // }

  // openEvent(id) {
  //   this.router.navigate(['/events' , id]);
  // }


    
   





