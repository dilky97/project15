import { AngularFirestore } from '@angular/fire/firestore';
import { EventDetails } from './../models/event-details.model';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EventDetailsService {

  constructor( private firestore: AngularFirestore ) { }

  getAllEvents() {
    return this.firestore.collection('events').valueChanges();
  }

  getShowingEvents( status: number, club: string ) {
    if ( club === 'all' && status === 99 ) {
      return this.firestore.collection('events').valueChanges();

    } else if ( club === 'all' && status !== 99 ) {
        return this.firestore.collection('events', ref =>
          ref.where( 'status', '==', status )  ).valueChanges();

    } else if ( club !== 'all' && status === 99 ) {
        return this.firestore.collection('events', ref =>
          ref.where( 'clubName', '==', club )  ).valueChanges();

    } else {
      return this.firestore.collection('events', ref =>
        ref.where( 'status', '==', status )
           .where( 'clubName', '==', club )  ).valueChanges();
    }
  }

  getViewEvent( id: string ) {
    return this.firestore.collection('events').doc(id).valueChanges();
  }

}
