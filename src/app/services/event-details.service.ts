import { AngularFirestore } from '@angular/fire/firestore';
import { EventDetails } from './../models/event-details.model';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EventDetailsService {

  constructor( private firestore: AngularFirestore ) { }

  getAllEvents() {
    return this.firestore.collection('events').snapshotChanges();
  }

  getShowingEvents( status: number, club: string ) {
    if ( club === 'all' && status === 99 ) {
      return this.firestore.collection('events').snapshotChanges();

    } else if ( club === 'all' && status !== 99 ) {
        return this.firestore.collection('events', ref =>
          ref.where( 'status', '==', status )  ).snapshotChanges();

    } else if ( club !== 'all' && status === 99 ) {
        return this.firestore.collection('events', ref =>
          ref.where( 'club', '==', club )  ).snapshotChanges();

    } else {
      return this.firestore.collection('events', ref =>
        ref.where( 'status', '==', status )
           .where( 'club', '==', club )  ).snapshotChanges();
    }

  getViewEvent( id: string ) {
    return this.firestore.collection('events').doc(id).valueChanges();
  }

}
