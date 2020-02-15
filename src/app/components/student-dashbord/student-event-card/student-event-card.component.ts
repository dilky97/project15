import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-student-event-card',
  templateUrl: './student-event-card.component.html',
  styleUrls: ['./student-event-card.component.scss']
})
export class StudentEventCardComponent implements OnInit {

  constructor() { }

  @Input( 'tempId' ) id: string ;           //////////////////////////////////////////////
  @Input( 'tempTitle' ) title: string ;     ////////////                    //////////////
  @Input( 'tempImg' ) img: string ;         ////////////    inputs from     //////////////
  @Input( 'tempClub' ) club: string ;       ////////////   home component   //////////////
  @Input( 'tempStatus' ) status: number ;   //////////////////////////////////////////////
  @Input( 'tempStartDate' ) startDate: any ;
  @Input( 'tempStartTime' ) startTime: any ;
  @Input( 'tempStartTimeStamp' ) startTimeStamp: number ;
  @Input( 'tempEndDate' ) endDate: any ;
  @Input( 'tempEndTime' ) endTime: any ;
  @Input( 'tempEndTimeStamp' ) endTimeStamp: number ;
  @Input( 'tempDescription' ) des: string ;

  ngOnInit() {
  }

}
