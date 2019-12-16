import { Injectable } from '@angular/core';
import { AngularFirestore,AngularFirestoreCollection } from "@angular/fire/firestore";
import { eventData } from '../models/event-details.model';


@Injectable({
  providedIn: 'root'
})
export class EventPlannerService {

  
  eventInfo: eventData;

  //private eventdbPath = '/events';

  eventsRef: AngularFirestoreCollection<eventData> = null;


  constructor(private dbstore : AngularFirestore) {
    //this.eventsRef = dbstore.collection(this.eventdbPath);
  }

  getEvents() {
    return this.dbstore.collection('events').snapshotChanges();
  }

  getSponsors(){
    return this.dbstore.collection('sponsors').snapshotChanges();
  }

}


