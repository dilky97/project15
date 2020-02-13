import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EventDetailsService } from 'src/app/services/event-details.service';
import * as firebase from 'firebase/app';
import { StudentDetails } from 'src/app/models/student-details.model';
import { AngularFirestore } from '@angular/fire/firestore';
import { EventDetails, eventData } from 'src/app/models/event-details.model';

@Component({
  selector: 'app-view-event',
  templateUrl: './view-event.component.html',
  styleUrls: ['./view-event.component.scss']
})
export class ViewEventComponent implements OnInit {

  selectedEventId: string;
  event = {} as eventData;
  student = {} as StudentDetails;

  isGoing: number ;

  constructor( private route: ActivatedRoute, private eventDetailsService: EventDetailsService, private firestore: AngularFirestore ) { }

  ngOnInit() {
    this.selectedEventId = this.route.snapshot.paramMap.get('id');
    this.eventDetailsService.getViewEvent(this.selectedEventId).subscribe( temp => {
      this.event = temp as eventData ;
    });

    if (JSON.parse(localStorage.getItem('user'))) {
      if ( localStorage.getItem('displayName') === 'student' ) {

        this.student = JSON.parse(localStorage.getItem('user'));

        if (this.student.participatingEvents.includes(this.selectedEventId)) {
          this.isGoing = 1 ;
        } else {
          this.isGoing = 0 ;
        }
      }
    }
  }

  changeGoing() {
        if (this.isGoing === 0) {
          this.student.participatingEvents.push(this.selectedEventId);
          localStorage.setItem('user', JSON.stringify(this.student));
          this.firestore.collection('students').doc(localStorage.getItem('uid')).update(this.student);
          this.isGoing = 1 ;
        } else if (this.isGoing === 1) {
          this.student.participatingEvents.splice( this.student.participatingEvents.indexOf(this.selectedEventId), 1 );
          localStorage.setItem('user', JSON.stringify(this.student));
          this.firestore.collection('students').doc(localStorage.getItem('uid')).update(this.student);
          this.isGoing = 0 ;
        }
  }

}
