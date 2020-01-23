import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EventDetailsService } from 'src/app/services/event-details.service';
import * as firebase from 'firebase/app';
import { StudentDetails } from 'src/app/models/student-details.model';
import { AngularFirestore } from '@angular/fire/firestore';
import { EventDetails } from 'src/app/models/event-details.model';

@Component({
  selector: 'app-view-event',
  templateUrl: './view-event.component.html',
  styleUrls: ['./view-event.component.scss']
})
export class ViewEventComponent implements OnInit {

  selectedEventId: string;
  event = {} as EventDetails;
  student = {} as StudentDetails;

  isGoing: number ;

  constructor( private route: ActivatedRoute, private eventDetails: EventDetailsService, private firestore: AngularFirestore ) { }

  ngOnInit() {
    this.selectedEventId = this.route.snapshot.paramMap.get('id');
    this.eventDetails.getViewEvent(this.selectedEventId).subscribe( temp => {
      this.event = temp as EventDetails ;
    });

    firebase.auth().onAuthStateChanged( user => {
      const promise = this.firestore.firestore.collection('students').doc(user.uid).get();
      promise.then( snapshot => {
        this.student =  snapshot.data() as StudentDetails;
        if (this.student.participatingEvents.includes(this.selectedEventId)) {
          this.isGoing = 1 ;
        } else {
          this.isGoing = 0 ;
        }
      });
    });

  }

  changeGoing() {
    firebase.auth().onAuthStateChanged( user => {
      const promise = this.firestore.firestore.collection('students').doc(user.uid).get();
      promise.then( snapshot => {
        this.student =  snapshot.data() as StudentDetails;
        if (this.isGoing === 0) {
          this.student.participatingEvents.push(this.selectedEventId);
          this.firestore.collection('students').doc(user.uid).update(this.student);
          this.isGoing = 1 ;
        } else if (this.isGoing === 1) {
          this.student.participatingEvents.splice( this.student.participatingEvents.indexOf(this.selectedEventId), 1 );
          this.firestore.collection('students').doc(user.uid).update(this.student);
          this.isGoing = 0 ;
        }
      });
    });
  }

}
