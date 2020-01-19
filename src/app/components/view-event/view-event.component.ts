import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EventDetailsService } from 'src/app/services/event-details.service';

@Component({
  selector: 'app-view-event',
  templateUrl: './view-event.component.html',
  styleUrls: ['./view-event.component.scss']
})
export class ViewEventComponent implements OnInit {

  selectedEventId: string;
  eventDetailsObject: any;

  constructor( private route: ActivatedRoute , private eventDetails: EventDetailsService ) { }

  ngOnInit() {
    this.selectedEventId = this.route.snapshot.paramMap.get('id');
    this.eventDetails.getViewEvent(this.selectedEventId).subscribe( temp => {
      this.eventDetailsObject = temp;
    });
  }

}
