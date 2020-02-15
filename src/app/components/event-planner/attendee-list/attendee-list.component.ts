import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from "@angular/fire/firestore";

import { eventData } from "../../../models/event-details.model";
import { StudentDetails } from "../../../models/student-details.model";
import { EventPlannerService } from "../../../services/event-planner.service";
import { UserDetailsService } from "../../../services/user-details.service";
import { Observable } from 'rxjs';

@Component({
  selector: 'app-attendee-list',
  templateUrl: './attendee-list.component.html',
  styleUrls: ['./attendee-list.component.scss']
})
export class AttendeeListComponent implements OnInit {

  eventId:string;
  eventDetails : eventData;
  eventObservable : Observable<eventData>;
  attendeeList : Array<string>;
  attendeeDetails : StudentDetails;
  attendeeObservable : Observable<StudentDetails>
  attendeeDetailsArr : StudentDetails[]=[];

  btnStyle : string = 'btn btn-main-sm';


  constructor(private dbstore : AngularFirestore, private eventService: EventPlannerService,private attendeeService:UserDetailsService) {
    //this.btnStyle ='btn btn-main-sm';
   }

  ngOnInit() {

    
    this.eventId = localStorage.getItem("curEventId");

    this.eventObservable = this.eventService.getEvent(this.eventId) as Observable<eventData>;

    this.eventObservable.subscribe(curEvent =>{
      this.eventDetails = curEvent as eventData;
      console.log(this.eventDetails);
      this.attendeeList = this.eventDetails.registeredStudents;
      // this.eventDetails.registeredStudents.forEach(student => {
      //   this.attendeeList.push(student);
        
      // })
      console.log(this.attendeeList);
      this.getAttendeeData();
    })

    

  }

  getAttendeeData(){
    this.attendeeList.forEach(attendee=>{
      this.attendeeObservable = this.attendeeService.readStudentDatabase(attendee) as Observable<StudentDetails>;

      this.attendeeObservable.subscribe(curAttendee=>{
        this.attendeeDetails = curAttendee as StudentDetails;
        this.attendeeDetailsArr.push(this.attendeeDetails);
      })
    })

    console.log(this.attendeeDetailsArr);
  }

  onCheckIn(){
    this.btnStyle = 'btn btn-active';
  }

 



  

}
