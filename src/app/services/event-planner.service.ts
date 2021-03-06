import { Injectable } from '@angular/core';
import { AngularFirestore,AngularFirestoreCollection } from "@angular/fire/firestore";
import { eventData } from '../models/event-details.model';


@Injectable({
  providedIn: 'root'
})
export class EventPlannerService {


  eventInfo: eventData;
  loggedInClub : string;

  //private eventdbPath = '/events';

  eventsRef: AngularFirestoreCollection<eventData> = null;


  constructor(private dbstore : AngularFirestore) {
    //this.eventsRef = dbstore.collection(this.eventdbPath);
  }

  createEventDatabase(newEvent:eventData) {
    return this.dbstore.collection('events').add(newEvent);
  }

  getanEvent(eventid : string){
    return this.dbstore.collection('events').doc(eventid).snapshotChanges();

  }

  getEvent(eventid: string){
    return this.dbstore.collection('events').doc(eventid).valueChanges();
  }

  updateEvent(eventid :string, editEvent: eventData){
    return this.dbstore.collection('events').doc(eventid).update(editEvent);
  }


  saveClubId(clubID:any){
    this.loggedInClub=clubID;
  }

  getClubId(){
    return this.loggedInClub;
  }

  getEvents() {
    return this.dbstore.collection('events').snapshotChanges();
  }

  getSponsors(){
    return this.dbstore.collection('sponsors').snapshotChanges();
  }

}
