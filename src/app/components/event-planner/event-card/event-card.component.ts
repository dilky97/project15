import { Component, OnInit,Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-event-card',
  templateUrl: './event-card.component.html',
  styleUrls: ['./event-card.component.scss']
})
export class EventCardComponent implements OnInit {

  @Input('tempEventId') id: string;
  @Input('tempEventName') eventName: string;
  @Input('tempStartDate') startDate: string;
  @Input('tempEndDate') endDate: string;
  @Input('tempStartTime') startTime: string;
  @Input('tempEndTime') endTime: string;
  @Input('tempVenue') venue: string;
  @Input('tempDescription') description: string;
  @Input('tempClubID') clubID: string;

  constructor( private router: Router ) { }


  ngOnInit() {
  }

  openEvent(id) {
    this.router.navigate(['/events' , id]);
  }

}
