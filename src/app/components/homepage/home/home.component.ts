import { EventDetails, eventData } from '../../../models/event-details.model';
import { EventDetailsService } from '../../../services/event-details.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl:  './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit {

  // allEventList: EventDetails[];
  // showingEventList: EventDetails[];
  allEventList: eventData[];
  showingEventList: eventData[];

  clubs = [] ;

  selectedClub = 'all' ;       // initially selected club is All
  selectedStatus = 0 ;         // ----- ( 1 = done/ended ) , ( 0 = undone/new ) , ( 99 = all ) ---- // , initially selected club is new
  selectedStatusWord = 'New' ; // for button display word

  test = 'initial' ;

  constructor( private eventDetails: EventDetailsService , private router: Router) {

    this.setViewList();

   }  // injecting event details service for component

  setStatus( input: number ) {     // set the chosen event of status
    this.selectedStatus = input ;
    if (input === 0) { this.selectedStatusWord = 'New'; }    ////////////////////////////////////////////////////////////
    if (input === 1) { this.selectedStatusWord = 'Ended'; }  // set the chosen event status as a string for displaying //
    if (input === 99) { this.selectedStatusWord = 'All'; }   ////////////////////////////////////////////////////////////
    this.setViewList();
  }

  setClub( input: string ) {
    this.selectedClub = input ;  // set the chosen club of dropdown
    this.setViewList();
  }

  setViewList() { // set the showing events list according to selected status ans club

    this.eventDetails.getShowingEvents( this.selectedStatus, this.selectedClub ).subscribe( actionArray => {
      this.showingEventList = actionArray as unknown as eventData[];
    });

  }

  openEvent(id) {
    this.router.navigate(['/events' , id]);
  }

  ngOnInit() {

    console.log(JSON.parse(localStorage.getItem('user')));
    console.log(localStorage.getItem('displayName'));
    console.log(localStorage.getItem('uid'));

////////// getting all event details - start //////////

    // set the all events list to find all clubs that has created events
    this.eventDetails.getAllEvents().subscribe( actionArray => {

      this.allEventList = actionArray as unknown as eventData[] ;

      for ( const item  of this.allEventList ) {          ////////////////////////////////////////////////
        if ( !( this.clubs.includes(item.clubID) ) ) {    //        pushing clubs to clubs array        //
          this.clubs.push(item.clubID);                   ////////////////////////////////////////////////
        }
      }

      this.clubs = this.clubs.sort();   // sorting clubs array by to name

    });

////////// getting all event details - end //////////
  }
}
