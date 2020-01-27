import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-event-card',
  templateUrl: './event-card.component.html',
  styleUrls: ['./event-card.component.scss']
})
export class EventCardComponent implements OnInit {

  constructor(private firestore:AngularFirestore) { }

  ngOnInit() {
    this.getevent();
  }
  eventdata;
  eventId = 'F5soMVw1hiPc11Sl00gp';

  getevent(){  

    this.firestore.collection('events').doc(this.eventId).valueChanges().subscribe(eventdata=>{
      this.eventdata=eventdata;
    });
  } 
}
