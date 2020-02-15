import { Component, OnInit, Input } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-event-card',
  templateUrl: './event-card.component.html',
  styleUrls: ['./event-card.component.scss']
})
export class EventCardComponent implements OnInit {

  constructor(private firestore:AngularFirestore) { }

  @Input('eventId') eventId;

  ngOnInit() {
    this.getevent();
  }
  eventdata;
 
  

  getevent(){  

    this.firestore.collection('events').doc(this.eventId).valueChanges().subscribe(eventdata=>{
      this.eventdata=eventdata;
    
    });
  } 
}
