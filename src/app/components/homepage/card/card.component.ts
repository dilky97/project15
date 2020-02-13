import { AngularFirestore } from '@angular/fire/firestore';
import { Component, OnInit , Input } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})

export class CardComponent implements OnInit {

  constructor( private firestore: AngularFirestore ) { // Injecting Angular Firestore

    this.timeLoop = setInterval( () => {
                      this.calculateTime();   // calculate remaining time every secound
                    }, 1000 );

  }

  rest: number ;     //////////////////////////////////////////////
  days: number ;     ///////                                ///////
  hours: number ;    ///////    variables for countdown     ///////
  mins: number ;     ///////                                ///////
  secs: number ;     //////////////////////////////////////////////

  timeLoop: any;
  eventDone = 0 ;   // check wether event is done or pending

  @Input( 'tempId' ) id: string ;           //////////////////////////////////////////////
  @Input( 'tempTitle' ) title: string ;     ////////////                    //////////////
  @Input( 'tempImg' ) img: string ;         ////////////    inputs from     //////////////
  @Input( 'tempClub' ) club: string ;       ////////////   home component   //////////////
  @Input( 'tempStatus' )status: number ;    //////////////////////////////////////////////
  @Input( 'tempStartDate' )startDate: any ;
  @Input( 'tempStartTime' )startTime: any ;
  @Input( 'tempStartTimeStamp' )startTimeStamp: number ;
  @Input( 'tempEndDate' )endDate: any ;
  @Input( 'tempEndTime' )endTime: any ;
  @Input( 'tempEndTimeStamp' )endTimeStamp: number ;
  @Input( 'tempDescription' )des: number ;


  ngOnInit() {

   this.calculateTime();                    // calculate remaining time every secound

  }

  calculateTime() {  // this function calculating the time left & updating the databse, if event done

    this.rest = ( this.startTimeStamp - Date.now() ) / 1000 ;   // remaining time as a number

    if ( this.rest >= 0 ) {      // if time is left
      this.days = Math.floor(this.rest / 86400);
      this.hours = Math.floor(this.rest / 3600) % 24;
      this.mins = Math.floor(this.rest / 60) % 60;
      this.secs = Math.round( this.rest % 60 ) ;
    } else {                    // if time is end
        this.eventDone = 1 ;
        clearInterval( this.timeLoop );
        this.firestore.doc('events/' + this.id ).update( { status: 1 } );
      }
  }

}
