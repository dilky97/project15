import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from "@angular/fire/firestore";
import { Subject,Observable,combineLatest } from "rxjs";


import { eventData } from "../../models/event-details.model";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  searchTerm : string;

  eventlist;
  events;
  eventObservable: Observable<eventData>;

  startAt  = new Subject();
  endAt= new Subject();

  startObservable = this.startAt.asObservable();
  endObservable = this.endAt.asObservable();

  constructor(private searchStore:AngularFirestore) { }

  ngOnInit() {

    this.getAllEvents().subscribe((events)=>{
      this.eventlist = events;
    })

    // Observable.combineLatest(this.startObservable,this.endObservable).subscribe((value)
    // )


  }

  getAllEvents(){
    return this.searchStore.collection('events', ref => ref.orderBy('eventName')).valueChanges();
  }

  searchQuery(start,end){
    return this.searchStore.collection('events',ref=>ref.limit(5).orderBy('eventName').startAt(start).endAt(end)).valueChanges();
  }

}
