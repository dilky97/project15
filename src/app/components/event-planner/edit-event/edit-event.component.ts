import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from "@angular/fire/firestore";
import { FormGroup, FormControl,FormBuilder } from '@angular/forms';
import { ToastrService } from "ngx-toastr";

import { Observable } from "rxjs";
import { EventPlannerService } from "../../../services/event-planner.service";
import { eventData } from "../../../models/event-details.model";

@Component({
  selector: 'app-edit-event',
  templateUrl: './edit-event.component.html',
  styleUrls: ['./edit-event.component.scss']
})
export class EditEventComponent implements OnInit {

  currentEventId : string;
  currentEventObservable : Observable<eventData>;
  currentEventData : eventData;
  editEvent : eventData = {} as eventData;
  returnedId : string;

  editEventForm = new FormGroup({
    clubID: new FormControl(),
    eventName: new FormControl(),
    startDate: new FormControl(),
    endDate: new FormControl(),
    startTime: new FormControl(),
    endTime: new FormControl(),
    venue: new FormControl(),
    description: new FormControl(),
    
  });

  constructor(private eventStore: AngularFirestore, private eventService:EventPlannerService, private editBuilder:FormBuilder, private toastr:ToastrService) {
    this.currentEventId = localStorage.getItem("curEventId");
    this.currentEventObservable = this.eventService.getEvent(this.currentEventId) as Observable<eventData>;
  }

  ngOnInit() {

    this.currentEventObservable.subscribe(res=>{
      this.currentEventData = res;
      console.log(this.currentEventData);
      this.setDefault(this.currentEventData);
    })
    
    
  }

  setDefault(currentEventData){
    let defaultVal = {
      clubID: this.currentEventData.clubID,
      eventName: this.currentEventData.eventName,
      startDate: this.currentEventData.startDate,
      endDate:this.currentEventData.endDate,
      startTime: this.currentEventData.startTime,
      endTime: this.currentEventData.endTime,
      venue: this.currentEventData.venue,
      description: this.currentEventData.description
    };

    console.log(defaultVal);

    this.editEventForm = this.editBuilder.group(defaultVal);
  }

  onSubmit(formData) {
    // this.editEvent.clubID = formData.clubId;
    // this.editEvent.eventName = formData.eventName;
    // this.editEvent.startDate = formData.startDate;
    // this.editEvent.endDate = formData.endDate;
    // this.editEvent.startTime = formData.startTime;
    // this.editEvent.endTime = formData.endTime;
    // this.editEvent.venue = formData.venue;
    // this.editEvent.description = formData.description;
    // this.editEvent.startTimeStamp = new Date(this.editEvent.startDate).getTime();
    // this.editEvent.endTimeStamp = new Date(this.editEvent.endDate).getTime();
    // this.editEvent.image = "";
    // this.editEvent.status = 0;

    this.editEvent = this.editEventForm.value;

    console.log(this.editEvent);

    if(this.eventService.updateEvent(this.currentEventId,this.editEvent)){
      this.toastr.success("Updated Successfully");
    }
    else{
      this.toastr.error("Update Failed");
    };

    


    

  }

  // onSubmit(){
  //   this.eventService.updateEvent(this.currentEventId,.........);
  // }

}
