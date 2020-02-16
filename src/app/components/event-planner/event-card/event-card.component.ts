import { Component, OnInit,Input } from '@angular/core';
import { Router } from '@angular/router';
import { EventPlannerService } from 'src/app/services/event-planner.service';
import * as firebase from 'firebase/app';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-event-card',
  templateUrl: './event-card.component.html',
  styleUrls: ['./event-card.component.scss']
})
export class EventCardComponent implements OnInit {

  @Input('tempEventId') id: string;
  @Input('tempClubId') clubId : string;
  @Input('tempEventName') eventName: string;
  @Input('tempStartDate') startDate: Date;
  @Input('tempEndDate') endDate: Date;
  @Input('tempStartTime') startTime: string;
  @Input('tempEndTime') endTime: string;
  @Input('tempVenue') venue: string;
  @Input('tempDescription') description: string;
  @Input('tempImage') image: string;


  clubID:string;

  constructor( private router: Router , private eventService: EventPlannerService, private dbstore:AngularFirestore  ) { }


  ngOnInit() {

  }

  openEvent(id) {
    this.router.navigate(['/events' , id]);
  }

  openManageEvent(id){
    localStorage.setItem("curEventId",id);
    this.clubID=localStorage.getItem("cludId");
    this.router.navigate(['/event-planner-home',this.clubID,'event', id]);
  }

  async cancelEvent(id){
    this.clubID=localStorage.getItem("cludId");
    await this.dbstore.collection('clubs').doc(this.clubID).update({"events": firebase.firestore.FieldValue.arrayRemove(id)});
    this.eventService.deleteEvent(id);
    location.reload();
  }

}
