import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from "rxjs/operators";
import { ActivatedRoute, Router } from '@angular/router';
import { ClubDetails } from 'src/app/models/club-details.model';
import { eventData, EventDetails } from "src/app/models/event-details.model";
import { EventPlannerService } from 'src/app/services/event-planner.service';
import { ClubDetailsService } from 'src/app/services/club-details.service';

@Component({
  selector: 'app-events-list',
  templateUrl: './events-list.component.html',
  styleUrls: ['./events-list.component.scss']
})
export class EventsListComponent implements OnInit {
  selectedClubId: any;
  club: ClubDetails = {} as ClubDetails;
  singleEventData: eventData[] = [];
  eventIdsoftheClub: Array<string>;

  clubObservable : Observable<ClubDetails>;

  constructor(private route: ActivatedRoute, private CreateEventRoute: Router,private EventDataService: EventPlannerService,private ClubDataService:ClubDetailsService) { }

  ngOnInit() {
    this.selectedClubId = this.route.snapshot.paramMap.get('id');

    console.log(this.selectedClubId);

    this.clubObservable = this.ClubDataService.readClubDatabase(this.selectedClubId) as Observable<ClubDetails> ;

    this.clubObservable.subscribe( tempClub => {

      this.club = tempClub as ClubDetails ;

      this.eventIdsoftheClub = this.club.events;

      console.log(this.eventIdsoftheClub);

      //console.log(this.getEventData());
      this.getEventData();
    })
    
    
 
  }

  getEventData(){
  
    this.eventIdsoftheClub.forEach(eventItem => {

      this.EventDataService.getanEvent(eventItem).subscribe( eventsArray =>{
        // this.singleEventData.push( 
        //   { id: eventsArray.payload.id,
        //     eventName: eventsArray.payload.data().eventName,
        //     startDate: eventsArray.payload.data().startDate,
        //     endDate: eventsArray.payload.data().startTime,
        //     startTime: eventsArray.payload.data().startTime,
        //     endTime: eventsArray.payload.data().endTime,
        //     venue: eventsArray.payload.data().venue,
        //     description: eventsArray.payload.data().description,
        //     clubID: eventsArray.payload.data().clubID }
        //  );
        this.singleEventData.push(eventsArray.payload.data() as eventData);

      })
      
    });
    console.log(this.singleEventData);
  }

  openEventPlan(){
    this.CreateEventRoute.navigate(['/event-planner-home',this.selectedClubId,'event', this.eventIdsoftheClub.values()]);
  }
}
