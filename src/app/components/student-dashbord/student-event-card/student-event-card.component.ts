import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-student-event-card',
  templateUrl: './student-event-card.component.html',
  styleUrls: ['./student-event-card.component.scss']
})
export class StudentEventCardComponent implements OnInit {

  constructor() { }

  @Input( 'tempId' ) id: string ;
  @Input( 'tempTitle' ) title: string ;
  @Input( 'tempDes' ) des: string ;
  @Input( 'tempImg' ) img: string ;
  @Input( 'tempClub' ) club: string ;
  @Input( 'tempDate' ) tempDate: any ;
  @Input( 'tempStatus' )status: number ;

  ngOnInit() {
  }

}
